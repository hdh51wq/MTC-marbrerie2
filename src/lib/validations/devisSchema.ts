import { z } from "zod";
import {
  PRODUCT_TYPE_VALUES,
  type ProductTypeValue,
} from "@/data/productTypes";

const phoneRegex = /^(\+216[\s-]?)?[2-9]\d{7}$/;

export function normalizePhone(value: string): string {
  return value.replace(/\s/g, "");
}

export const devisFormSchema = z.object({
  nom: z.string().trim().min(1, { message: "nomRequired" }),
  prenom: z.string().trim().min(1, { message: "prenomRequired" }),
  email: z.string().trim().email({ message: "emailInvalid" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "telephoneRequired" })
    .refine((val) => phoneRegex.test(normalizePhone(val)), {
      message: "telephoneInvalid",
    }),
  productType: z
    .string()
    .min(1, { message: "productTypeRequired" })
    .refine(
      (value): value is ProductTypeValue =>
        (PRODUCT_TYPE_VALUES as readonly string[]).includes(value),
      { message: "productTypeRequired" },
    ),
  dimensions: z.string().trim().min(1, { message: "dimensionsRequired" }),
  honeypot: z.string().optional(),
});

export type DevisFormValues = z.infer<typeof devisFormSchema>;

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_FILE_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

export type DevisFileValidationError = "fileTooLarge" | "fileTypeInvalid";

export function validateDevisFile(
  file: File | null | undefined,
): { ok: true } | { ok: false; message: DevisFileValidationError } {
  if (!file || file.size === 0) {
    return { ok: true };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, message: "fileTooLarge" };
  }
  if (
    !ACCEPTED_FILE_MIME_TYPES.includes(
      file.type as (typeof ACCEPTED_FILE_MIME_TYPES)[number],
    )
  ) {
    return { ok: false, message: "fileTypeInvalid" };
  }
  return { ok: true };
}

export function parseDevisFormData(formData: FormData): DevisFormValues {
  const honeypot = formData.get("website");
  return {
    nom: String(formData.get("nom") ?? ""),
    prenom: String(formData.get("prenom") ?? ""),
    email: String(formData.get("email") ?? ""),
    telephone: String(formData.get("telephone") ?? ""),
    productType: String(formData.get("productType") ?? ""),
    dimensions: String(formData.get("dimensions") ?? ""),
    honeypot: honeypot != null ? String(honeypot) : undefined,
  };
}
