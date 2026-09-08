"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { renderRows, sendEmail, wrapHtml } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  companyInquirySchema,
  engineerApplicationSchema,
  isAllowedResume,
  type FormActionResult,
} from "@/lib/validation/contact";

const GENERIC_ERROR =
  "We couldn't send your message right now. Please try again in a moment or email us directly.";

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

function formToObject(formData: FormData, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of keys) {
    const v = formData.get(key);
    out[key] = typeof v === "string" ? v : "";
  }
  return out;
}

function flatten<T extends z.ZodType>(error: z.ZodError<z.output<T>>) {
  return z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
}

/** Shared guard: honeypot → rate limit → Turnstile. */
async function guard(
  scope: string,
  honeypot: string,
  turnstileToken: string | null,
): Promise<FormActionResult | null> {
  if (honeypot) {
    // Bot filled the hidden field. Pretend success; drop the payload.
    return { ok: true };
  }
  const ip = await clientIp();
  const rl = rateLimit(`${scope}:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!rl.allowed) {
    return {
      ok: false,
      error: `Too many submissions. Please try again in about ${Math.ceil(rl.retryAfterSeconds / 60)} minute(s).`,
    };
  }
  const ts = await verifyTurnstile(turnstileToken, ip === "unknown" ? undefined : ip);
  if (!ts.ok) {
    return {
      ok: false,
      error: "We couldn't verify that you're human. Please refresh the page and try again.",
    };
  }
  return null;
}

export async function submitCompanyInquiry(formData: FormData): Promise<FormActionResult> {
  const raw = formToObject(formData, [
    "name",
    "email",
    "company",
    "role",
    "projectType",
    "teamSize",
    "timeline",
    "budget",
    "description",
    "website",
  ]);
  const parsed = companyInquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  const blocked = await guard("company", parsed.data.website ?? "", formData.get("cf-turnstile-response") as string | null);
  if (blocked) return blocked;

  const d = parsed.data;
  const { html, text } = renderRows([
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company],
    ["Role", d.role],
    ["Project type", d.projectType],
    ["Team size", d.teamSize],
    ["Timeline", d.timeline],
    ["Budget range", d.budget],
    ["Project description", d.description],
  ]);

  const sent = await sendEmail({
    subject: `[Company inquiry] ${d.company} — ${d.projectType}`,
    replyTo: d.email,
    html: wrapHtml("New company inquiry", html),
    text: `New company inquiry\n\n${text}`,
  });

  if (!sent.ok) return { ok: false, error: GENERIC_ERROR };
  return { ok: true };
}

export async function submitEngineerApplication(formData: FormData): Promise<FormActionResult> {
  const raw = formToObject(formData, [
    "name",
    "email",
    "location",
    "skills",
    "experience",
    "linkedin",
    "github",
    "resumeLink",
    "message",
    "website",
  ]);
  const parsed = engineerApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  // Résumé: optional file (validated server-side) and/or a link.
  const resumeEntry = formData.get("resume");
  const resumeFile = resumeEntry instanceof File && resumeEntry.size > 0 ? resumeEntry : null;
  if (resumeFile) {
    const check = isAllowedResume(resumeFile);
    if (!check.ok) return { ok: false, error: check.error, fieldErrors: { resume: [check.error] } };
  }
  if (!resumeFile && !parsed.data.resumeLink) {
    const msg = "Attach a résumé (PDF/Word) or add a link to one.";
    return { ok: false, error: msg, fieldErrors: { resume: [msg] } };
  }

  const blocked = await guard("engineer", parsed.data.website ?? "", formData.get("cf-turnstile-response") as string | null);
  if (blocked) return blocked;

  const d = parsed.data;
  const { html, text } = renderRows([
    ["Name", d.name],
    ["Email", d.email],
    ["Location", d.location],
    ["Primary skills", d.skills],
    ["Experience", d.experience],
    ["LinkedIn / portfolio", d.linkedin],
    ["GitHub", d.github],
    ["Résumé link", d.resumeLink],
    ["Résumé file", resumeFile ? `${resumeFile.name} (${Math.round(resumeFile.size / 1024)} KB, attached)` : undefined],
    ["Message", d.message],
  ]);

  const attachments = resumeFile
    ? [
        {
          filename: resumeFile.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
          content: Buffer.from(await resumeFile.arrayBuffer()),
        },
      ]
    : undefined;

  const sent = await sendEmail({
    subject: `[Engineer application] ${d.name} — ${d.experience}`,
    replyTo: d.email,
    html: wrapHtml("New engineer application", html),
    text: `New engineer application\n\n${text}`,
    attachments,
  });

  if (!sent.ok) return { ok: false, error: GENERIC_ERROR };
  return { ok: true };
}
