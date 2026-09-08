import type { Metadata } from "next";

import { CareersTeaser } from "@/components/home/CareersTeaser";
import { EngineeringCapabilities } from "@/components/home/EngineeringCapabilities";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { PlatformEcosystem } from "@/components/home/PlatformEcosystem";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { ProcessOverview } from "@/components/home/ProcessOverview";
import { QualitySection } from "@/components/home/QualitySection";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "An independent software engineering agency bringing experienced engineers into AI training, model evaluation, coding evaluation, and human-in-the-loop projects.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformMarquee />
      <WhatWeDo />
      <EngineeringCapabilities />
      <ProcessOverview />
      <QualitySection />
      <PlatformEcosystem />
      <CareersTeaser />
      <FinalCTA />
    </>
  );
}
