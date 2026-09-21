"use server";

import { put } from "@vercel/blob";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/siteConfig";
import {
  buildConfirmationContactMessageEmailHtml,
  buildUsineContactMessageEmailHtml,
} from "@/lib/email/templates";
import {
  contactFormSchema,
  parseContactFormData,
  validateContactFile,
} from "@/lib/validations/contactSchema";

export type SubmitContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      code: "validation" | "file" | "upload" | "email" | "config";
      fileError?: "fileTooLarge" | "fileTypeInvalid";
    };

export async function submitContactMessage(
  _prevState: SubmitContactState,
  formData: FormData,
): Promise<SubmitContactState> {
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "fr";

  const raw = parseContactFormData(formData);

  if (raw.honeypot && raw.honeypot.trim().length > 0) {
    return { status: "success" };
  }

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", code: "validation" };
  }

  const data = parsed.data;

  const fileEntry = formData.get("fichier");
  const file =
    fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  const fileValidation = validateContactFile(file);
  if (!fileValidation.ok) {
    return { status: "error", code: "file", fileError: fileValidation.message };
  }

  if (!process.env.RESEND_API_KEY) {
    return { status: "error", code: "config" };
  }

  let fileUrl: string | null = null;

  if (file) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return { status: "error", code: "config" };
    }

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const blob = await put(`contact/${Date.now()}-${safeName}`, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      fileUrl = blob.url;
    } catch {
      return { status: "error", code: "upload" };
    }
  }

  const tUsine = await getTranslations({
    locale: "fr",
    namespace: "contact.emailUsine",
  });
  const tConfirm = await getTranslations({
    locale,
    namespace: "contact.emailConfirm",
  });

  const usineHtml = buildUsineContactMessageEmailHtml(
    data,
    {
      heading: tUsine("heading"),
      name: tUsine("name"),
      email: tUsine("email"),
      message: tUsine("message"),
      fileLink: tUsine("fileLink"),
      noFile: tUsine("noFile"),
    },
    fileUrl,
  );

  const confirmHtml = buildConfirmationContactMessageEmailHtml({
    subject: tConfirm("subject"),
    greeting: tConfirm("greeting", { name: data.name }),
    body: tConfirm("body"),
    fallbackLabel: tConfirm("fallback"),
    whatsappLabel: tConfirm("whatsapp"),
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = `${siteConfig.name} <${siteConfig.email}>`;

  try {
    const [usineResult, confirmResult] = await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: siteConfig.email,
        replyTo: data.email,
        subject: tUsine("subject", {
          name: data.name,
        }),
        html: usineHtml,
      }),
      resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: tConfirm("subject"),
        html: confirmHtml,
      }),
    ]);

    if (usineResult.error || confirmResult.error) {
      return { status: "error", code: "email" };
    }
  } catch {
    return { status: "error", code: "email" };
  }

  return { status: "success" };
}

export async function submitContactMessageFromClient(
  formData: FormData,
): Promise<SubmitContactState> {
  return submitContactMessage({ status: "idle" }, formData);
}
