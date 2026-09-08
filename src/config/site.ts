const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skillstand-in.com";

export const siteConfig = {
  name: "Skill Stand In",
  shortName: "SSI",
  url: rawUrl.replace(/\/$/, ""),
  tagline: "Skills for a Smarter Tomorrow",
  description:
    "Skill Stand In is an independent software engineering agency that brings experienced engineers and technical specialists into AI training, evaluation, coding, and human-feedback projects.",
  positioning:
    "Skill Stand In brings experienced software engineers and technical specialists into AI training, evaluation, and human-feedback workflows.",
  supporting:
    "From coding and technical reasoning to model evaluation and structured data work, our engineering team helps AI projects scale with reliable human expertise.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ceo@skillstand-in.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/skillstandin-llc",
  },
  /** Short disclaimer, shown next to the marquee and ecosystem sections. */
  disclaimerShort:
    "Skill Stand In is an independent organization and is not affiliated with or endorsed by the platforms displayed unless explicitly stated.",
  /** Long disclaimer, shown in the footer and on the Platforms page. */
  disclaimerLong:
    "Skill Stand In is an independent organization. References to third-party platforms do not imply partnership, sponsorship, affiliation, or endorsement unless expressly stated.",
  foundedYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
