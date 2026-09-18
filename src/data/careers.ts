import "server-only";

import type { CareerRegion } from "@/data/career-regions";
import { loadCareers } from "@/lib/careers";

export type {
  CareerCategory,
  CareerRole,
  CareersPageCopy,
  CareersTeaserCopy,
} from "@/data/career-types";
export type { CareerRegion } from "@/data/career-regions";

export function getCareersPage() {
  return loadCareers().page;
}

export function getCareersTeaser() {
  return loadCareers().teaser;
}

export function getCareerRoles() {
  return loadCareers().roles;
}

export function getCareerRole(slug: string) {
  return getCareerRoles().find((role) => role.slug === slug);
}

export function getCareerRolePath(slug: string) {
  return `/careers/${slug}`;
}

export function getCareerRolesByCategory(region?: CareerRegion) {
  const { categories, roles } = loadCareers();
  const visible = region ? roles.filter((role) => role.region === region) : roles;
  return categories
    .map((category) => ({
      ...category,
      roles: visible.filter((role) => role.category === category.id),
    }))
    .filter((group) => group.roles.length > 0);
}
