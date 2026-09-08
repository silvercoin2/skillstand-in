import type { Metadata } from "next";
import { CompassIcon, TargetIcon } from "lucide-react";

import { FinalCTA } from "@/components/home/FinalCTA";
import { Container, Section } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Skill Stand In is an independent engineering agency built on a simple idea: better AI requires knowledgeable humans who can evaluate reasoning, write quality solutions, and give meaningful feedback.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Skill Stand In" title={about.heading} description={about.intro} />

      <Section aria-labelledby="mission-heading">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <TargetIcon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 id="mission-heading" className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Mission
                </h2>
                <p className="text-2xl leading-snug font-bold tracking-tight sm:text-[1.75rem]">
                  {about.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/25 via-surface to-accent p-8 shadow-soft sm:p-10 dark:from-brand/15 dark:via-surface dark:to-elevated">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <CompassIcon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Vision
                </h2>
                <p className="text-2xl leading-snug font-bold tracking-tight sm:text-[1.75rem]">
                  {about.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="principles-heading" className="border-y border-border/70 bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Principles"
              title={<span id="principles-heading">What we hold ourselves to</span>}
              description="Four commitments that shape how we scope work, match contributors, and review outputs."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {about.principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <FeatureCard title={p.title} description={p.description} index={`0${i + 1}`} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="independence-heading">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="independence-heading" className="text-[2rem] leading-tight font-bold tracking-tight sm:text-[2.5rem]">
              An independent engineering organization
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Skill Stand In is not a gig-work directory or a recruiting landing page. We are a
              software engineering agency whose contributors work across the AI training ecosystem.
              We reference third-party platforms to describe where our expertise applies, not to
              imply a partnership, sponsorship, or endorsement.
            </p>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
