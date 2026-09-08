import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/** Builds route metadata with canonical + OpenGraph + Twitter tags (PRD §29). */
export function buildMetadata({ title, description, path, noIndex }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    foundingDate: String(siteConfig.foundedYear),
    sameAs: [siteConfig.socials.linkedin],
    knowsAbout: [
      "AI training",
      "AI model evaluation",
      "Coding evaluation",
      "Human-in-the-loop AI",
      "Software engineering",
      "Reinforcement learning from human feedback",
    ],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Engineering capacity for AI training and evaluation",
    serviceType: "AI training and evaluation engineering services",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: "Worldwide",
    description:
      "Experienced software engineers and technical specialists for coding evaluation, model evaluation, AI training, human preference evaluation, red teaming, and data annotation projects.",
    url: `${siteConfig.url}/companies`,
  };
}
