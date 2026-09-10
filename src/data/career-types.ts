export interface CareerCategory {
  id: string;
  label: string;
  description: string;
}

export interface CareerRole {
  slug: string;
  title: string;
  category: string;
  /** Collapsed-header category chip, e.g. "Engineering". */
  headerCategory: string;
  type: string;
  location: string;
  employment: string;
  shortDescription: string;
  about: string[];
  youWillDo: string[];
  lookingFor: string[];
  lookingForNote?: string;
  helpfulHeading?: string;
  helpfulIntro?: string;
  helpfulNote?: string;
  chips?: string[];
  extraSections?: CareerExtraSection[];
  applyLabel: string;
  applyUrl: string;
}

export interface CareerExtraSection {
  heading: string;
  paragraphs: string[];
  items: string[];
}

export interface CareersPageCopy {
  eyebrow: string;
  title: string;
  description: string;
  viewRoles: string;
  openRolesEyebrow: string;
  openRolesTitle: string;
  openRolesDescription: string;
}

export interface CareersTeaserCopy {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}
