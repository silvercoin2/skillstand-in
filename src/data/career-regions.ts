export const CAREER_REGIONS = [
  { id: "united-states", label: "United States" },
  { id: "outside-us", label: "Outside of the U.S." },
] as const;

export type CareerRegion = (typeof CAREER_REGIONS)[number]["id"];

export const DEFAULT_CAREER_REGION: CareerRegion = "united-states";

export function isCareerRegion(value: string | undefined): value is CareerRegion {
  return CAREER_REGIONS.some((region) => region.id === value);
}

export function parseCareerRegion(value: string | string[] | undefined): CareerRegion {
  const raw = Array.isArray(value) ? value[0] : value;
  return isCareerRegion(raw) ? raw : DEFAULT_CAREER_REGION;
}

export function getCareerListingPath(region: CareerRegion) {
  return `/careers?location=${region}`;
}
