import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import "server-only";
import { z } from "zod";

import type {
  CareerCategory,
  CareerExtraSection,
  CareerRole,
  CareersPageCopy,
  CareersTeaserCopy,
} from "@/data/career-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "careers");
const ROLES_DIR = path.join(CONTENT_DIR, "roles");

const pageCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  viewRoles: z.string(),
  openRolesEyebrow: z.string(),
  openRolesTitle: z.string(),
  openRolesDescription: z.string(),
});

const teaserCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  cta: z.string(),
});

const categorySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const configSchema = z.object({
  defaultApplyUrl: z.string().url(),
  page: pageCopySchema,
  teaser: teaserCopySchema,
  categories: z.array(categorySchema).min(1),
});

const optionalText = z
  .union([z.string(), z.null()])
  .optional()
  .transform((value) => {
    const text = value?.trim();
    return text ? text : undefined;
  });

const roleFrontmatterSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  headerCategory: optionalText,
  type: z.string().min(1),
  location: z.string().min(1).default("Remote"),
  employment: z.string().min(1).default("Hourly / Part-time"),
  compensation: optionalText,
  order: z.number().int().default(100),
  shortDescription: optionalText,
  applyUrl: optionalText,
  applyLabel: optionalText,
  draft: z.boolean().optional(),
  lookingForNote: optionalText,
  helpfulHeading: optionalText,
  helpfulIntro: optionalText,
  helpfulNote: optionalText,
  chips: z.array(z.string().min(1)).optional(),
});

interface CareersData {
  page: CareersPageCopy;
  teaser: CareersTeaserCopy;
  categories: CareerCategory[];
  roles: CareerRole[];
}

const SECTION_ALIASES: Record<string, "about" | "youWillDo" | "lookingFor"> = {
  "about the role": "about",
  "about skillstand in": "about",
  "about skill stand in": "about",
  "about skillstandin": "about",
  "what you'll do": "youWillDo",
  "what you’ll do": "youWillDo",
  "what we're looking for": "lookingFor",
  "what we’re looking for": "lookingFor",
  requirements: "lookingFor",
};

const SKIP_HEADINGS = new Set(["join skillstand in", "join skill stand in"]);

function normalizeHeading(value: string): string {
  return value.replace(/['’]/g, "'").trim().toLowerCase();
}

function parseListItems(block: string): string[] {
  return block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").trim())
    .filter(Boolean);
}

function parseParagraphs(block: string): string[] {
  return block
    .split(/\n\s*\n/)
    .map((part) =>
      part
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !/^[-*]\s+/.test(line) && !/^\d+\.\s+/.test(line))
        .join(" "),
    )
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseBody(markdown: string): {
  about: string[];
  youWillDo: string[];
  lookingFor: string[];
  extraSections: CareerExtraSection[];
} {
  const about: string[] = [];
  const youWillDo: string[] = [];
  const lookingFor: string[] = [];
  const extraSections: CareerExtraSection[] = [];
  const chunks = markdown.split(/^##\s+/m).slice(1);

  for (const chunk of chunks) {
    const newline = chunk.indexOf("\n");
    const heading = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const body = newline === -1 ? "" : chunk.slice(newline + 1).trim();
    const normalized = normalizeHeading(heading);
    if (SKIP_HEADINGS.has(normalized)) continue;

    const key = SECTION_ALIASES[normalized];
    if (key === "about") about.push(...parseParagraphs(body));
    else if (key === "youWillDo") youWillDo.push(...parseListItems(body));
    else if (key === "lookingFor") lookingFor.push(...parseListItems(body));
    else {
      const paragraphs = parseParagraphs(body);
      const items = parseListItems(body);
      if (paragraphs.length === 0 && items.length === 0) continue;
      extraSections.push({ heading, paragraphs, items });
    }
  }

  return { about, youWillDo, lookingFor, extraSections };
}

function loadConfig() {
  const filePath = path.join(CONTENT_DIR, "config.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return configSchema.parse(parsed.data);
}

function loadRole(
  filePath: string,
  defaultApplyUrl: string,
  categoryLabels: Map<string, string>,
): { order: number; role: CareerRole } | null {
  const slug = path.basename(filePath, ".md");
  if (slug.startsWith("_")) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = roleFrontmatterSchema.parse(parsed.data);
  if (data.draft) return null;

  if (data.applyUrl) {
    const url = z.string().url().safeParse(data.applyUrl);
    if (!url.success) {
      throw new Error(`Career role "${slug}" has an invalid applyUrl.`);
    }
  }

  const { about, youWillDo, lookingFor, extraSections } = parseBody(parsed.content);
  if (about.length === 0 || youWillDo.length === 0 || lookingFor.length === 0) {
    throw new Error(
      `Career role "${slug}" is missing a required Markdown section (About the Role, What You'll Do, What We're Looking For).`,
    );
  }

  const categoryLabel = categoryLabels.get(data.category);
  if (!categoryLabel) {
    throw new Error(`Career role "${slug}" uses unknown category "${data.category}".`);
  }

  return {
    order: data.order,
    role: {
      slug,
      title: data.title,
      category: data.category,
      headerCategory: data.headerCategory ?? categoryLabel,
      type: data.type,
      location: data.location,
      employment: data.employment,
      compensation: data.compensation,
      shortDescription: data.shortDescription ?? about[0],
      about,
      youWillDo,
      lookingFor,
      lookingForNote: data.lookingForNote,
      helpfulHeading: data.helpfulHeading,
      helpfulIntro: data.helpfulIntro,
      helpfulNote: data.helpfulNote,
      chips: data.chips,
      extraSections,
      applyLabel: data.applyLabel ?? `Apply as ${data.title}`,
      applyUrl: data.applyUrl ?? defaultApplyUrl,
    },
  };
}

function readCareers(): CareersData {
  const config = loadConfig();
  const categoryLabels = new Map(config.categories.map((category) => [category.id, category.label]));
  const files = fs
    .readdirSync(ROLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(ROLES_DIR, name));

  const withOrder: { order: number; role: CareerRole }[] = [];
  for (const filePath of files) {
    const loaded = loadRole(filePath, config.defaultApplyUrl, categoryLabels);
    if (!loaded) continue;
    withOrder.push(loaded);
  }

  withOrder.sort((a, b) => {
    const categoryIndex = (id: string) => config.categories.findIndex((category) => category.id === id);
    const byCategory = categoryIndex(a.role.category) - categoryIndex(b.role.category);
    if (byCategory !== 0) return byCategory;
    if (a.order !== b.order) return a.order - b.order;
    return a.role.title.localeCompare(b.role.title);
  });

  return {
    page: config.page,
    teaser: config.teaser,
    categories: config.categories,
    roles: withOrder.map((item) => item.role),
  };
}

let cached: CareersData | null = null;

export function loadCareers(): CareersData {
  if (process.env.NODE_ENV === "production" && cached) return cached;
  const data = readCareers();
  cached = data;
  return data;
}
