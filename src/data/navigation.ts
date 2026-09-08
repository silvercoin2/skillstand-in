export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Platforms", href: "/platforms" },
  { label: "For Engineers", href: "/engineers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Work With Us",
    items: [
      { label: "For Companies", href: "/companies" },
      { label: "For Engineers", href: "/engineers" },
      { label: "Platforms", href: "/platforms" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const ctaLinks = {
  workWithUs: "/contact?mode=company",
  joinNetwork: "/contact?mode=engineer",
  howItWorks: "/how-it-works",
  careers: "/careers",
} as const;
