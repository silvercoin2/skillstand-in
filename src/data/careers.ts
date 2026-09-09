import "server-only";

import { loadCareers } from "@/lib/careers";

export type {
  CareerCategory,
  CareerRole,
  CareersPageCopy,
  CareersTeaserCopy,
} from "@/data/career-types";

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

export function getCareerRolesByCategory() {
  const { categories, roles } = loadCareers();
  return categories
    .map((category) => ({
      ...category,
      roles: roles.filter((role) => role.category === category.id),
    }))
    .filter((group) => group.roles.length > 0);
}
