import { z } from "zod";

import {
  budgetRanges,
  experienceRanges,
  projectTypes,
  teamSizes,
  timelines,
} from "@/data/content";

/* Shared, client + server. Keep messages human; they render inline. */

const trimmed = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalTrimmed = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional()
    .or(z.literal(""));

const optionalUrl = (label: string) =>
  z
    .string()
    .trim()
    .max(300, `${label} is too long.`)
    .refine(
      (v) => v === "" || /^https?:\/\/[^\s]+$/i.test(v),
      `${label} must be a valid URL starting with http:// or https://.`,
    )
    .optional()
    .or(z.literal(""));

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(254, "Email is too long.")
  .pipe(z.email("Enter a valid email address."));

/** Honeypot: must be empty. Bots that fill it are silently accepted-and-dropped. */
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const companyInquirySchema = z.object({
  name: trimmed(120, "Name"),
  email,
  company: trimmed(160, "Company"),
  role: optionalTrimmed(120, "Role"),
  projectType: z.enum(projectTypes, { message: "Select a project type." }),
  teamSize: z.enum(teamSizes).optional().or(z.literal("")),
  timeline: z.enum(timelines).optional().or(z.literal("")),
  budget: z.enum(budgetRanges).optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(30, "Please give us at least a couple of sentences (30+ characters).")
    .max(4000, "Description must be 4000 characters or fewer."),
  website: honeypot,
});

export type CompanyInquiryInput = z.infer<typeof companyInquirySchema>;

export const engineerApplicationSchema = z.object({
  name: trimmed(120, "Name"),
  email,
  location: trimmed(120, "Location"),
  skills: z
    .string()
    .trim()
    .min(3, "List at least one primary skill.")
    .max(600, "Skills must be 600 characters or fewer."),
  experience: z.enum(experienceRanges, { message: "Select your experience range." }),
  linkedin: optionalUrl("LinkedIn or portfolio URL"),
  github: optionalUrl("GitHub URL"),
  resumeLink: optionalUrl("Résumé link"),
  message: optionalTrimmed(3000, "Message"),
  website: honeypot,
});

export type EngineerApplicationInput = z.infer<typeof engineerApplicationSchema>;

/* Résumé upload constraints (server-enforced; mirrored in the input's accept attr). */
export const RESUME_MAX_BYTES = 4 * 1024 * 1024; // 4 MB
export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function isAllowedResume(file: File): { ok: true } | { ok: false; error: string } {
  if (file.size === 0) return { ok: false, error: "The résumé file is empty." };
  if (file.size > RESUME_MAX_BYTES) return { ok: false, error: "Résumé must be 4 MB or smaller." };
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  const extOk = ["pdf", "doc", "docx"].includes(ext);
  const typeOk = file.type === "" || RESUME_MIME_TYPES.has(file.type);
  if (!extOk || !typeOk) return { ok: false, error: "Résumé must be a PDF or Word document." };
  return { ok: true };
}

/** Shape returned by every contact server action. */
export type FormActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };
