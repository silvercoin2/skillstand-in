import type { Metadata } from "next";

import { LocationFilter } from "@/components/careers/LocationFilter";
import { RoleList } from "@/components/careers/RoleList";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CAREER_REGIONS, parseCareerRegion } from "@/data/career-regions";
import { getCareerRolesByCategory, getCareersPage } from "@/data/careers";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Skill Stand In's AI expert marketplace. Open remote roles for engineers, AI evaluators, healthcare experts, and security analysts.",
  path: "/careers",
});

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const region = parseCareerRegion(params.location);
  const regionLabel = CAREER_REGIONS.find((item) => item.id === region)?.label ?? region;
  const careersPage = getCareersPage();
  const roleGroups = getCareerRolesByCategory(region);

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
              className="mb-8"
            />
          </Reveal>

          <Reveal className="mb-10">
            <LocationFilter current={region} />
          </Reveal>

          {roleGroups.length === 0 ? (
            <p className="text-muted-foreground">No open roles for {regionLabel} right now.</p>
          ) : (
            <div className="flex flex-col gap-16">
              {roleGroups.map((group, groupIndex) => (
                <Reveal key={group.id} delay={groupIndex * 60}>
                  <section aria-labelledby={`${group.id}-heading`} className="flex flex-col gap-6">
                    <div className="flex max-w-2xl flex-col gap-2">
                      <h3 id={`${group.id}-heading`} className="text-xl font-bold tracking-tight sm:text-2xl">
                        {group.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {group.description}
                      </p>
                    </div>
                    <RoleList roles={group.roles} />
                  </section>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
