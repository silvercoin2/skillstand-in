import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { companies, quality, whatWeDo } from "@/data/content";
import { ctaLinks } from "@/data/navigation";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "For Companies",
  description:
    "Bring experienced software engineers into coding evaluation, model evaluation, AI response review, red teaming, dataset validation, and AI agent testing. Technical talent for AI projects that need more than generic crowd work.",
  path: "/companies",
});

export default function CompaniesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
      />
      <PageHero
        eyebrow="For Companies"
        title={companies.heading}
        description={companies.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <TrackedLink
              href={ctaLinks.workWithUs}
              event="company_cta_clicked"
              eventProps={{ location: "companies_hero" }}
            >
              {companies.cta}
              <ButtonArrow />
            </TrackedLink>
          </Button>
          <Button asChild size="xl" variant="outline">
            <TrackedLink href="/how-it-works" event="how_it_works_clicked" eventProps={{ location: "companies_hero" }}>
              See how we work
            </TrackedLink>
          </Button>
        </div>
      </PageHero>

      <Section aria-labelledby="engagements-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Engagement Areas"
                title={<span id="engagements-heading">Where engineers make the difference</span>}
                description="Each engagement is scoped to your acceptance criteria and staffed with contributors whose background fits the technical domain."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {companies.engagementAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] font-semibold shadow-soft transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/50"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <CheckIcon className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="companies-capabilities-heading" className="border-y border-border/70 bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What You Get"
              title={<span id="companies-capabilities-heading">Engineering capacity, not anonymous labor</span>}
              description="Contributors who can read the code, follow the reasoning, and tell you when a generated answer only looks right."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {whatWeDo.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <FeatureCard title={item.title} description={item.description} icon={item.icon} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="companies-quality-heading">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Quality"
              title={<span id="companies-quality-heading">{quality.heading}</span>}
              description={quality.description}
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
            {quality.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <FeatureCard
                  title={pillar.title}
                  description={pillar.description}
                  icon={pillar.icon}
                  index={`0${i + 1}`}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <section aria-labelledby="companies-cta-heading" className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/35 via-surface to-accent px-6 py-16 text-center shadow-soft sm:px-12 sm:py-20 dark:from-brand/20 dark:via-surface dark:to-elevated">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
                <h2
                  id="companies-cta-heading"
                  className="text-[2.25rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
                >
                  {companies.ctaHeading}
                </h2>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Share the scope, timeline, and quality bar. We will come back with how we would staff and review it.
                </p>
                <Button asChild size="xl">
                  <TrackedLink
                    href={ctaLinks.workWithUs}
                    event="company_cta_clicked"
                    eventProps={{ location: "companies_footer" }}
                  >
                    {companies.cta}
                    <ButtonArrow />
                  </TrackedLink>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
