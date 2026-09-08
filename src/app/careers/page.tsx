import type { Metadata } from "next";

import { RoleAccordion } from "@/components/careers/RoleAccordion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { careerRoles, careersPage } from "@/data/careers";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Open-ended roles at Skill Stand In: Technical Consultant and Account Manager. Remote, flexible work across the AI training ecosystem.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow={careersPage.eyebrow} title={careersPage.title} description={careersPage.description}>
        <ArrowLink href="#open-roles" direction="down">
          {careersPage.viewRoles}
        </ArrowLink>
      </PageHero>

      <Section id="open-roles" aria-labelledby="open-roles-heading" className="scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={careersPage.openRolesEyebrow}
              title={<span id="open-roles-heading">{careersPage.openRolesTitle}</span>}
              description={careersPage.openRolesDescription}
              className="mb-10"
            />
          </Reveal>
          <Reveal delay={80}>
            <RoleAccordion roles={careerRoles} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
