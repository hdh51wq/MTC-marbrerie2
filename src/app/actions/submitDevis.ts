"use server";

import { put } from "@vercel/blob";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/siteConfig";
import { PRODUCT_TYPE_VALUES } from "@/data/productTypes";
import type { ProductTypeValue } from "@/data/productTypes";
import {
  buildConfirmationDevisEmailHtml,
  buildUsineDevisEmailHtml,
} from "@/lib/email/templates";
import {
  devisFormSchema,
  parseDevisFormData,
  validateDevisFile,
} from "@/lib/validations/devisSchema";

export type SubmitDevisState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      code: "validation" | "file" | "upload" | "email" | "config";
      fileError?: "fileTooLarge" | "fileTypeInvalid";
    };

export async function submitDevis(
  _prevState: SubmitDevisState,
  formData: FormData,
): Promise<SubmitDevisState> {
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "fr";

  const raw = parseDevisFormData(formData);

  if (raw.honeypot && raw.honeypot.trim().length > 0) {
    return { status: "success" };
  }

  const parsed = devisFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", code: "validation" };
  }

  const data = parsed.data;

  const fileEntry = formData.get("fichier");
  const file =
    fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  const fileValidation = validateDevisFile(file);
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
      const blob = await put(`devis/${Date.now()}-${safeName}`, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      fileUrl = blob.url;
    } catch {
      return { status: "error", code: "upload" };
    }
  }

  const tUsine = await getTranslations({ locale: "fr", namespace: "devis.emailUsine" });
  const tConfirm = await getTranslations({ locale, namespace: "devis.emailConfirm" });

  const productTypes = Object.fromEntries(
    PRODUCT_TYPE_VALUES.map((key) => [key, tUsine(`productTypes.${key}`)]),
  ) as Record<ProductTypeValue, string>;

  const usineHtml = buildUsineDevisEmailHtml(
    data,
    {
      heading: tUsine("heading"),
      nom: tUsine("nom"),
      prenom: tUsine("prenom"),
      email: tUsine("email"),
      telephone: tUsine("telephone"),
      productType: tUsine("productType"),
      dimensions: tUsine("dimensions"),
      fileLink: tUsine("fileLink"),
      noFile: tUsine("noFile"),
      productTypes,
    },
    fileUrl,
  );

  const confirmHtml = buildConfirmationDevisEmailHtml({
    subject: tConfirm("subject"),
    greeting: tConfirm("greeting", { name: data.prenom }),
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
          name: `${data.prenom} ${data.nom}`,
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

export async function submitDevisFromClient(formData: FormData): Promise<SubmitDevisState> {
  return submitDevis({ status: "idle" }, formData);
}
