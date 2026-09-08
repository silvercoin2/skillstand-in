import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/config/site";

export interface OutboundEmail {
  subject: string;
  replyTo: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
}

/** HTML-escape untrusted strings before interpolating into email markup. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject email headers. */
export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function renderRows(rows: [label: string, value: string | undefined][]): {
  html: string;
  text: string;
} {
  const present = rows.filter(([, v]) => v && v.trim() !== "") as [string, string][];
  const html = `
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;color:#142018">
      ${present
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #dfe8e1;vertical-align:top;color:#647069;width:180px">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #dfe8e1;vertical-align:top;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
        )
        .join("")}
    </table>`;
  const text = present.map(([label, value]) => `${label}: ${value}`).join("\n");
  return { html, text };
}

export function wrapHtml(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f7faf7">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dfe8e1;border-radius:16px;padding:24px">
      <p style="margin:0 0 4px;font:600 11px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#126b43">${escapeHtml(siteConfig.name)}</p>
      <h1 style="margin:0 0 16px;font:700 22px/1.2 ui-sans-serif,system-ui,sans-serif;color:#142018">${escapeHtml(title)}</h1>
      ${body}
    </div></body></html>`;
}

/**
 * Sends via Resend when configured. Without RESEND_API_KEY the message is
 * logged to the server console so the whole flow is testable locally.
 */
export async function sendEmail(email: OutboundEmail): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.info("[email:dev] RESEND_API_KEY not set — logging instead of sending.");
    console.info(`[email:dev] To: ${to}\n[email:dev] Reply-To: ${email.replyTo}\n[email:dev] Subject: ${email.subject}\n${email.text}`);
    if (email.attachments?.length) {
      console.info(
        `[email:dev] Attachments: ${email.attachments.map((a) => `${a.filename} (${a.content.byteLength} bytes)`).join(", ")}`,
      );
    }
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: sanitizeHeader(email.replyTo),
      subject: sanitizeHeader(email.subject),
      html: email.html,
      text: email.text,
      attachments: email.attachments,
    });
    if (error) {
      console.error("[email] Resend error", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false, error: "send-failed" };
  }
}
