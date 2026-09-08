/**
 * Open roles. Google Form URLs are public and live here; env vars can override.
 */
export interface CareerRole {
  slug: string;
  title: string;
  /** Collapsed-header category chip, e.g. "Technical". */
  headerCategory: string;
  type: string;
  location: string;
  employment: string;
  shortDescription: string;
  about: string[];
  youWillDo: string[];
  lookingFor: string[];
  lookingForNote?: string;
  helpfulHeading: string;
  helpfulIntro: string;
  helpfulNote?: string;
  chips: string[];
  applyLabel: string;
  applyUrl: string;
}

const TECHNICAL_CONSULTANT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfPLpcFepevBxK4v7w3xlo7Ism3URgsOqOAHnv8Kz4ulsnzmA/viewform";
const ACCOUNT_MANAGER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJAfaML06yp9pPVBdXiCDdsuE_F5ZSLMDdMBJONSjg6jplXQ/viewform";

function formUrl(envValue: string | undefined, fallback: string): string {
  const fromEnv = envValue?.trim();
  return fromEnv || fallback;
}

export const careersPage = {
  eyebrow: "Join Skill Stand In",
  title: "Work at the Intersection of Human Expertise and AI",
  description:
    "Skill Stand In brings together technical specialists and operations professionals to support work across the AI training ecosystem. Whether you are an experienced engineer or strong at managing accounts, workflows, and operations, we are always looking for reliable people to join our team.",
  viewRoles: "View Open Roles",
  openRolesEyebrow: "Open Roles",
  openRolesTitle: "We're Always Looking for Great People",
  openRolesDescription:
    "We maintain two core roles as we expand our work across AI training and evaluation platforms.",
} as const;

export const careersTeaser = {
  eyebrow: "Join Skill Stand In",
  title: "Work With Us",
  description:
    "We're always looking for talented technical consultants and organized operations professionals to support our growing AI training network.",
  cta: "Explore Careers",
} as const;

export const careerRoles: CareerRole[] = [
  {
    slug: "technical-consultant",
    title: "Technical Consultant",
    headerCategory: "Technical",
    type: "Engineering / AI Training",
    location: "Remote",
    employment: "Project-based / Flexible",
    shortDescription:
      "Work across AI training platforms by completing technical qualification processes, participating in AI-assisted interviews, and executing coding, reasoning, evaluation, and other technical assignments.",
    about: [
      "As a Technical Consultant at Skill Stand In, you will apply your software engineering and technical expertise to projects available through AI training and evaluation platforms.",
      "Depending on the platform and project, you may complete technical assessments or AI-assisted interviews before becoming eligible for assignments. Those interviews and assessments are platform-required qualification steps for your own authorized work.",
      "Once qualified, you will work independently on assigned tasks while maintaining high standards for accuracy, reasoning, communication, and reliability.",
    ],
    youWillDo: [
      "Register and maintain profiles on supported AI training platforms.",
      "Complete platform-specific onboarding and qualification processes.",
      "Participate in AI-assisted or other technical interviews where required, as part of your own qualification for the work.",
      "Complete coding, debugging, evaluation, reasoning, and software-related tasks.",
      "Review AI-generated code and technical responses for correctness and quality.",
      "Follow platform-specific instructions, quality requirements, and deadlines.",
      "Maintain consistent work quality across assigned projects.",
      "Communicate task status, platform issues, and project requirements with the Skill Stand In team.",
    ],
    lookingFor: [
      "Professional software development experience.",
      "Strong understanding of programming and computer science fundamentals.",
      "Experience with one or more modern programming languages.",
      "Ability to explain technical decisions clearly.",
      "Strong written communication skills.",
      "Attention to detail and ability to follow complex instructions.",
      "Comfortable working independently.",
      "Comfortable completing AI-based interviewing and evaluation steps required by a platform.",
      "Reliable availability for project-based work.",
    ],
    helpfulHeading: "Helpful Technical Backgrounds",
    helpfulIntro: "Examples include:",
    helpfulNote: "Experience with every technology is not required.",
    chips: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Java",
      "C++",
      "Go",
      "SQL",
      "Cloud",
      "DevOps",
      "Machine Learning",
      "LLMs",
    ],
    applyLabel: "Apply as Technical Consultant",
    applyUrl: formUrl(process.env.NEXT_PUBLIC_TECHNICAL_CONSULTANT_FORM_URL, TECHNICAL_CONSULTANT_FORM),
  },
  {
    slug: "account-manager",
    title: "Account Manager",
    headerCategory: "Operations",
    type: "Operations",
    location: "Remote",
    employment: "Flexible",
    shortDescription:
      "Manage AI platform accounts, project availability, operational workflows, contributor coordination, payments, and day-to-day platform administration.",
    about: [
      "The Account Manager supports the operational side of Skill Stand In.",
      "You do not need to be a software engineer.",
      "Your responsibility is to keep our platform operations organized, monitor activity, coordinate with technical consultants, and ensure important account and payment information is tracked accurately.",
      "This position is best suited for someone who is organized, dependable, comfortable working with online platforms, and able to manage several workflows simultaneously.",
    ],
    youWillDo: [
      "Manage day-to-day activity across assigned AI training platforms.",
      "Track account status, onboarding progress, qualification status, and available projects.",
      "Monitor project and task availability.",
      "Coordinate assignments with Technical Consultants.",
      "Track task completion and operational status.",
      "Monitor platform notifications and important account updates.",
      "Maintain organized internal records.",
      "Track platform earnings and payment schedules.",
      "Reconcile payments against completed work.",
      "Flag missing, delayed, or incorrect payments for review.",
      "Assist with platform support requests and account-related issues.",
      "Communicate important deadlines or changes to the appropriate team members.",
    ],
    lookingFor: [
      "Strong organizational skills.",
      "Good written English and communication skills.",
      "Comfortable working with websites, dashboards, spreadsheets, and online tools.",
      "Strong attention to detail.",
      "Ability to manage multiple accounts and workflows.",
      "Responsible handling of confidential business information.",
      "Ability to work independently and follow documented procedures.",
      "Consistent availability and responsiveness.",
      "Basic spreadsheet experience.",
    ],
    lookingForNote: "No software engineering background is required.",
    helpfulHeading: "Helpful Experience",
    helpfulIntro: "Experience in any of these areas is useful but not required:",
    chips: [
      "Account Management",
      "Operations",
      "Virtual Assistance",
      "Project Coordination",
      "Recruiting Operations",
      "Customer Support",
      "Data Entry",
      "Bookkeeping",
      "Google Sheets",
    ],
    applyLabel: "Apply as Account Manager",
    applyUrl: formUrl(process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_FORM_URL, ACCOUNT_MANAGER_FORM),
  },
];

export function getCareerRole(slug: string): CareerRole | undefined {
  return careerRoles.find((role) => role.slug === slug);
}
