/**
 * Single source of truth for the AI-training ecosystem directory.
 * Drives the homepage marquee, the /platforms directory, filters, sitemap
 * hints and (later) any CMS/API integration. Do not duplicate this list.
 *
 * Legal note (PRD §2, §35): Skill Stand In is independent. Nothing here
 * implies partnership, endorsement or a client relationship.
 */

export type PlatformCategory = "engineering" | "evaluation" | "data" | "emerging";

/** Cross-cutting facets that power extra filter chips (PRD §15). */
export type PlatformTag = "ai-training" | "research";

/**
 * How a logo asset should be treated so it stays legible in both themes.
 * - dark:  dark monochrome mark. Light: grayscale -> hover color. Dark: inverted.
 * - color: multi-color mark. Light: grayscale -> hover color. Dark: white silhouette.
 * - light: white mark. Light: darkened. Dark: as-is.
 * - bw:    pure black/white two-tone. Light: as-is. Dark: inverted.
 */
export type LogoVariant = "dark" | "color" | "light" | "bw";

export interface Platform {
  id: string;
  name: string;
  url: string;
  /** Full logo (wordmark) served from /public. Null renders a generated wordmark. */
  logo: string | null;
  /** Optional small brand mark used next to the generated wordmark. */
  mark?: string;
  logoVariant?: LogoVariant;
  /** Where the asset came from (permission audit trail). */
  logoSource?: string;
  category: PlatformCategory;
  tags?: PlatformTag[];
  /** Featured platforms populate marquee row 1; the rest populate row 2. */
  featured: boolean;
  /** Hidden from every surface until the URL is verified. */
  status?: "active" | "unverified";
}

export const PLATFORM_CATEGORIES: Record<
  PlatformCategory,
  { label: string; short: string; description: string }
> = {
  engineering: {
    label: "Engineering & Expert AI Training",
    short: "Engineering",
    description:
      "Platforms that source software engineers and domain experts for coding, reasoning, and expert-level model training work.",
  },
  evaluation: {
    label: "AI Data & Evaluation",
    short: "Evaluation",
    description:
      "Managed data and evaluation programs for language, speech, search relevance, and model output review.",
  },
  data: {
    label: "Human Data & Task Platforms",
    short: "Data",
    description:
      "Large-scale human data collection, annotation, and task marketplaces supporting AI development.",
  },
  emerging: {
    label: "Emerging Platforms",
    short: "Emerging",
    description:
      "Newer entrants, aggregators, and specialist operators in the AI training ecosystem.",
  },
};

export const PLATFORM_TAGS: Record<PlatformTag, { label: string }> = {
  "ai-training": { label: "AI Training" },
  research: { label: "Research" },
};

export const platforms: Platform[] = [
  // --- Engineering & Expert AI Training -------------------------------------
  {
    id: "mercor",
    name: "Mercor",
    url: "https://www.mercor.com/",
    logo: null,
    mark: "/platforms/mercor-mark.svg",
    logoVariant: "color",
    logoSource: "https://www.mercor.com/images/m_logo.svg",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "handshake-ai",
    name: "Handshake AI",
    url: "https://joinhandshake.com/ai/",
    logo: "/platforms/handshake-ai.svg",
    logoVariant: "color",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "turing",
    name: "Turing",
    url: "https://www.turing.com/",
    logo: "/platforms/turing.svg",
    logoVariant: "dark",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "dataannotation",
    name: "DataAnnotation",
    url: "https://www.dataannotation.tech/",
    logo: "/platforms/dataannotation.svg",
    logoVariant: "dark",
    logoSource:
      "https://cdn.prod.website-files.com/6996ec17cbb52cceab20d127/6a91eb0a5cf804d8c951b610_dataannotation-logo.svg",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "mindrift",
    name: "Mindrift",
    url: "https://mindrift.ai/",
    logo: "/platforms/mindrift.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "micro1",
    name: "micro1",
    url: "https://www.micro1.ai/",
    logo: null,
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "outlier",
    name: "Outlier",
    url: "https://outlier.ai/",
    logo: "/platforms/outlier.svg",
    logoVariant: "dark",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "alignerr",
    name: "Alignerr",
    url: "https://www.alignerr.com/",
    logo: "/platforms/alignerr.svg",
    logoVariant: "dark",
    logoSource: "https://www.alignerr.com/images/logo.svg (white background rect removed)",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "invisible",
    name: "Invisible",
    url: "https://invisibletech.ai/",
    logo: "/platforms/invisible.png",
    logoVariant: "bw",
    logoSource: "user-provided brand asset",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "braintrust",
    name: "Braintrust",
    url: "https://www.usebraintrust.com/",
    logo: "/platforms/braintrust.png",
    logoVariant: "dark",
    logoSource: "https://www.usebraintrust.com/braintrust-logo.png",
    category: "engineering",
    featured: true,
  },
  {
    id: "stellar-ai",
    name: "Stellar AI",
    url: "https://joinstellar.ai/",
    logo: "/platforms/stellar-ai.svg",
    logoVariant: "dark",
    logoSource: "https://joinstellar.ai/static/stellar/images/logo-stellar.svg",
    category: "engineering",
    tags: ["ai-training"],
    featured: true,
  },

  // --- AI Data & Evaluation --------------------------------------------------
  {
    id: "crowdgen",
    name: "CrowdGen",
    url: "https://crowdgen.com/",
    logo: "/platforms/crowdgen.svg",
    logoVariant: "color",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "evaluation",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "rws-trainai",
    name: "RWS TrainAI",
    url: "https://www.rws.com/artificial-intelligence/train-ai-data-services/",
    logo: "/platforms/rws-trainai.svg",
    logoVariant: "color",
    logoSource: "https://www.rws.com/media/images/logo-rws_tcm228-236815.svg (RWS corporate mark)",
    category: "evaluation",
    featured: false,
  },
  {
    id: "telus-digital-ai-community",
    name: "TELUS Digital AI Community",
    url: "https://www.telusinternational.ai/",
    logo: null,
    mark: "/platforms/telus-mark.svg",
    logoVariant: "color",
    logoSource: "https://www.telusinternational.ai/landing/favicon.svg",
    category: "evaluation",
    tags: ["ai-training"],
    featured: true,
  },
  {
    id: "oneforma",
    name: "OneForma",
    url: "https://www.oneforma.com/",
    logo: "/platforms/oneforma.svg",
    logoVariant: "dark",
    logoSource: "https://www.oneforma.com/app/uploads/2026/06/oneforma-logo.svg",
    category: "evaluation",
    featured: false,
  },
  {
    id: "imerit",
    name: "iMerit",
    url: "https://imerit.ai/",
    logo: "/platforms/imerit.svg",
    logoVariant: "color",
    logoSource:
      "https://imerit.ai/wp-content/uploads/2026/08/iMerit_EXL-transition-logo-lockup_1.svg",
    category: "evaluation",
    featured: false,
  },
  {
    id: "toloka",
    name: "Toloka",
    url: "https://toloka.ai/",
    logo: "/platforms/toloka.png",
    logoVariant: "dark",
    logoSource: "user-provided brand asset",
    category: "evaluation",
    tags: ["ai-training", "research"],
    featured: true,
  },
  {
    id: "welocalize",
    name: "Welocalize",
    url: "https://www.welocalize.com/",
    logo: "/platforms/welocalize.svg",
    logoVariant: "light",
    logoSource:
      "https://www.welocalize.com/wp-content/uploads/2025/05/logo.svg (white background rect removed)",
    category: "evaluation",
    featured: false,
  },
  {
    id: "sourcebae",
    name: "SourceBae",
    url: "https://sourcebae.com/",
    logo: "/platforms/sourcebae.svg",
    logoVariant: "color",
    logoSource:
      "https://amzn-sourcebae-prod.s3.ap-south-1.amazonaws.com/production/Assets/Sourcebae-logo.svg",
    category: "evaluation",
    tags: ["ai-training"],
    featured: false,
  },
  {
    id: "fradle",
    name: "Fradle",
    url: "https://www.fradle.com/",
    logo: "/platforms/fradle.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "evaluation",
    tags: ["ai-training"],
    featured: false,
  },

  // --- Human Data & Task Platforms ------------------------------------------
  {
    id: "prolific",
    name: "Prolific",
    url: "https://www.prolific.com/",
    logo: "/platforms/prolific.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "data",
    tags: ["research"],
    featured: true,
  },
  {
    id: "clickworker",
    name: "Clickworker",
    url: "https://www.clickworker.com/",
    logo: "/platforms/clickworker.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "data",
    featured: false,
  },
  {
    id: "mturk",
    name: "Amazon Mechanical Turk",
    url: "https://www.mturk.com/",
    logo: "/platforms/mturk.svg",
    logoVariant: "color",
    logoSource: "https://www.mturk.com/assets/images/logo.svg",
    category: "data",
    tags: ["research"],
    featured: true,
  },
  {
    id: "hive-micro",
    name: "Hive Micro",
    url: "https://hivemicro.com/",
    logo: "/platforms/hive-micro.svg",
    logoVariant: "color",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "data",
    featured: false,
  },
  {
    id: "neevo",
    name: "Neevo",
    url: "https://www.neevo.ai/",
    logo: "/platforms/neevo.svg",
    logoVariant: "light",
    logoSource: "https://www.neevo.ai/wp-content/themes/sd-neevo/assets/images/logo.svg",
    category: "data",
    featured: false,
  },
  {
    id: "defined-ai",
    name: "Defined.ai",
    url: "https://defined.ai/",
    logo: "/platforms/defined-ai.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "data",
    featured: false,
  },
  {
    id: "lxt",
    name: "LXT",
    url: "https://www.lxt.ai/",
    logo: "/platforms/lxt.png",
    logoVariant: "color",
    logoSource: "https://s40145.pcdn.co/wp-content/uploads/2022/09/LXT_Logo_Site-resized.png",
    category: "data",
    featured: false,
  },
  {
    id: "dataforce",
    name: "DataForce",
    url: "https://www.dataforce.ai/",
    logo: "/platforms/dataforce.png",
    logoVariant: "light",
    logoSource: "user-provided brand asset",
    category: "data",
    featured: false,
  },
  {
    id: "centific",
    name: "Centific",
    url: "https://www.centific.com/",
    logo: "/platforms/centific.svg",
    logoVariant: "dark",
    logoSource: "user-provided brand asset (vectorized from downloaded raster)",
    category: "data",
    featured: false,
  },
  {
    id: "e2f",
    name: "e2f",
    url: "https://e2f.com/",
    logo: "/platforms/e2f.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "data",
    featured: false,
  },
  {
    id: "cloudfactory",
    name: "CloudFactory",
    url: "https://www.cloudfactory.com/",
    logo: "/platforms/cloudfactory.png",
    logoVariant: "color",
    logoSource: "https://www.cloudfactory.com/hubfs/cf-logo-blue-transparent%20(1).png",
    category: "data",
    featured: true,
  },
  {
    id: "taskverse",
    name: "TaskVerse",
    url: "https://www.taskverse.io/",
    logo: "/platforms/taskverse.png",
    logoVariant: "color",
    logoSource: "user-provided brand asset",
    category: "data",
    featured: false,
  },
  {
    id: "teemwork",
    name: "Teemwork.ai",
    url: "https://www.teemwork.ai/",
    logo: null,
    category: "data",
    featured: false,
  },

  // --- Emerging ---------------------------------------------------------------
  {
    id: "opentrain",
    name: "OpenTrain AI",
    url: "https://www.opentrain.ai/",
    logo: "/platforms/opentrain.svg",
    logoVariant: "bw",
    logoSource: "https://www.opentrain.ai/images/OpenTrain-AI-Logo.svg",
    category: "emerging",
    tags: ["ai-training"],
    featured: false,
  },
  {
    id: "parai-labs",
    name: "Parai Labs",
    url: "https://parailabs.com/",
    logo: null,
    mark: "/platforms/parai-labs-mark.svg",
    logoVariant: "color",
    logoSource: "https://parailabs.com/favicon.svg",
    category: "emerging",
    tags: ["ai-training"],
    featured: false,
  },
  {
    id: "femote",
    name: "Femote",
    url: "https://femote.ai/",
    logo: "/platforms/femote.png",
    logoVariant: "light",
    logoSource: "user-provided brand asset",
    category: "emerging",
    tags: ["ai-training"],
    featured: false,
  },
  {
    id: "corpshore",
    name: "Corpshore AI",
    url: "https://corpshore.ai/",
    logo: "/platforms/corpshore.png",
    logoVariant: "dark",
    logoSource: "user-provided brand asset",
    category: "emerging",
    featured: false,
  },
];

/* ----------------------------- Helpers ----------------------------------- */

export const activePlatforms = platforms.filter((p) => p.status !== "unverified");

export function getFeaturedPlatforms(): Platform[] {
  return activePlatforms.filter((p) => p.featured);
}

export function getSecondaryPlatforms(): Platform[] {
  return activePlatforms.filter((p) => !p.featured);
}

export function getPlatformsByCategory(category: PlatformCategory): Platform[] {
  return activePlatforms.filter((p) => p.category === category);
}

export type PlatformFilter = "all" | PlatformCategory | PlatformTag;

export const PLATFORM_FILTERS: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "engineering", label: PLATFORM_CATEGORIES.engineering.short },
  { value: "ai-training", label: PLATFORM_TAGS["ai-training"].label },
  { value: "evaluation", label: PLATFORM_CATEGORIES.evaluation.short },
  { value: "data", label: PLATFORM_CATEGORIES.data.short },
  { value: "research", label: PLATFORM_TAGS.research.label },
  { value: "emerging", label: PLATFORM_CATEGORIES.emerging.short },
];

export function isPlatformFilter(value: string): value is PlatformFilter {
  return PLATFORM_FILTERS.some((f) => f.value === value);
}

export function filterPlatforms(filter: PlatformFilter, query = ""): Platform[] {
  const q = query.trim().toLowerCase();
  return activePlatforms.filter((p) => {
    const matchesFilter =
      filter === "all" ||
      p.category === filter ||
      (p.tags ?? []).includes(filter as PlatformTag);
    const matchesQuery =
      q.length === 0 ||
      p.name.toLowerCase().includes(q) ||
      PLATFORM_CATEGORIES[p.category].label.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
}
