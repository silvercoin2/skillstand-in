import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getCareerRolePath, getCareerRoles } from "@/data/careers";

const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] =
  [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
    { path: "/platforms", changeFrequency: "weekly", priority: 0.8 },
    { path: "/companies", changeFrequency: "monthly", priority: 0.8 },
    { path: "/engineers", changeFrequency: "monthly", priority: 0.8 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const roles = getCareerRoles().map((role) => ({
    url: `${siteConfig.url}${getCareerRolePath(role.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...roles];
}
