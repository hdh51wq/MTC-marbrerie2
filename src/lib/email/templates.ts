import { siteConfig, getWhatsAppUrl } from "@/data/siteConfig";
import type { DevisFormValues } from "@/lib/validations/devisSchema";
import type { ContactFormValues } from "@/lib/validations/contactSchema";
import type { ProductTypeValue } from "@/data/productTypes";

type UsineEmailLabels = {
  heading: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  productType: string;
  dimensions: string;
  fileLink: string;
  noFile: string;
  productTypes: Record<ProductTypeValue, string>;
};

type UsineContactEmailLabels = {
  heading: string;
  name: string;
  email: string;
  message: string;
  fileLink: string;
  noFile: string;
};

type ConfirmationEmailCopy = {
  subject: string;
  greeting: string;
  body: string;
  fallbackLabel: string;
  whatsappLabel: string;
};

export function buildUsineDevisEmailHtml(
  data: DevisFormValues,
  labels: UsineEmailLabels,
  fileUrl: string | null,
): string {
  const productLabel =
    labels.productTypes[data.productType] ?? data.productType;

  const fileSection = fileUrl
    ? `<p style="margin:8px 0 0;"><strong>${labels.fileLink}</strong> <a href="${fileUrl}" style="color:#ef5d36;">${fileUrl}</a></p>`
    : `<p style="margin:8px 0 0;color:#6b7280;">${labels.noFile}</p>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:Georgia,serif;background:#f8f9fa;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
    <h1 style="margin:0 0 24px;font-size:22px;color:#ef5d36;">${labels.heading}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
      <tr><td style="padding:8px 0;font-weight:bold;width:140px;">${labels.nom}</td><td>${escapeHtml(data.nom)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.prenom}</td><td>${escapeHtml(data.prenom)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.email}</td><td><a href="mailto:${escapeHtml(data.email)}" style="color:#ef5d36;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.telephone}</td><td>${escapeHtml(data.telephone)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.productType}</td><td>${escapeHtml(productLabel)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.dimensions}</td><td>${escapeHtml(data.dimensions)}</td></tr>
    </table>
    ${fileSection}
  </div>
</body>
</html>`;
}

export function buildConfirmationDevisEmailHtml(copy: ConfirmationEmailCopy): string {
  const whatsappUrl = getWhatsAppUrl();

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:Georgia,serif;background:#f8f9fa;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
    <h1 style="margin:0 0 16px;font-size:22px;color:#ef5d36;">${escapeHtml(copy.subject)}</h1>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${escapeHtml(copy.greeting)}</p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">${escapeHtml(copy.body)}</p>
    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">${escapeHtml(copy.fallbackLabel)}</p>
    <p style="margin:8px 0 0;font-size:15px;">
      <strong>${escapeHtml(siteConfig.phone)}</strong><br>
      <a href="${whatsappUrl}" style="color:#ef5d36;">${escapeHtml(copy.whatsappLabel)}</a>
    </p>
  </div>
</body>
</html>`;
}

export function buildUsineContactMessageEmailHtml(
  data: ContactFormValues,
  labels: UsineContactEmailLabels,
  fileUrl: string | null,
): string {
  const fileSection = fileUrl
    ? `<p style="margin:8px 0 0;"><strong>${labels.fileLink}</strong> <a href="${fileUrl}" style="color:#ef5d36;">${fileUrl}</a></p>`
    : `<p style="margin:8px 0 0;color:#6b7280;">${labels.noFile}</p>`;

  const formattedMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:Georgia,serif;background:#f8f9fa;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
    <h1 style="margin:0 0 24px;font-size:22px;color:#ef5d36;">${labels.heading}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
      <tr><td style="padding:8px 0;font-weight:bold;width:120px;">${labels.name}</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">${labels.email}</td><td><a href="mailto:${escapeHtml(data.email)}" style="color:#ef5d36;">${escapeHtml(data.email)}</a></td></tr>
    </table>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-weight:bold;font-size:15px;">${labels.message} :</p>
      <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;color:#374151;">${formattedMessage}</div>
    </div>
    <div style="margin-top:16px;">
      ${fileSection}
    </div>
  </div>
</body>
</html>`;
}

export function buildConfirmationContactMessageEmailHtml(
  copy: ConfirmationEmailCopy,
): string {
  const whatsappUrl = getWhatsAppUrl();

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;font-family:Georgia,serif;background:#f8f9fa;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
    <h1 style="margin:0 0 16px;font-size:22px;color:#ef5d36;">${escapeHtml(copy.subject)}</h1>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${escapeHtml(copy.greeting)}</p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">${escapeHtml(copy.body)}</p>
    <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">${escapeHtml(copy.fallbackLabel)}</p>
    <p style="margin:8px 0 0;font-size:15px;">
      <strong>${escapeHtml(siteConfig.phone)}</strong><br>
      <a href="${whatsappUrl}" style="color:#ef5d36;">${escapeHtml(copy.whatsappLabel)}</a>
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type {
  UsineEmailLabels,
  UsineContactEmailLabels,
  ConfirmationEmailCopy,
};
