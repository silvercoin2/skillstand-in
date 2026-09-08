import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { capabilities, engineers } from "@/data/content";
import { ctaLinks } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "For Engineers",
  description:
    "Join Skill Stand In's engineering network. Software, ML, data, DevOps and QA engineers apply real expertise to AI training, model evaluation, and human-feedback projects.",
  path: "/engineers",
});

export default function EngineersPage() {
  return (
    <>
      <PageHero eyebrow="For Engineers" title={engineers.heading} description={engineers.description}>
        <Button asChild size="xl">
          <TrackedLink
            href={ctaLinks.joinNetwork}
            event="engineer_cta_clicked"
            eventProps={{ location: "engineers_hero" }}
          >
            {engineers.cta}
            <ButtonArrow />
          </TrackedLink>
        </Button>
      </PageHero>

      <Section aria-labelledby="roles-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Who We Look For"
                title={<span id="roles-heading">Engineers and specialists with real depth</span>}
                description="Backgrounds vary. What they share is technical rigor and the judgment to know when something is wrong."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {engineers.roles.map((role, i) => (
                  <li
                    key={role}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] font-semibold shadow-soft transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/50"
                  >
                    {role}
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="qualities-heading" className="border-y border-border/70 bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Desired Qualities"
                title={<span id="qualities-heading">What great contributors have in common</span>}
                description="These matter more to us than any single language or framework."
              />
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {engineers.qualities.map((q) => (
                  <li key={q} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Typical stacks
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {capabilities.groups.flatMap((g) => g.items).map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs font-medium text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Not on the list? Tell us what you work with. Depth in one area beats breadth in many.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="engineers-how-heading">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What to Expect"
              title={<span id="engineers-how-heading">How joining the network works</span>}
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
            {[
              {
                title: "Apply",
                description:
                  "Share your background, primary skills, and links to your work. We review every application ourselves.",
              },
              {
                title: "Match",
                description:
                  "When a project fits your skills and availability, we reach out with the scope, quality criteria, and workflow.",
              },
              {
                title: "Contribute",
                description:
                  "Do the technical work, get clear feedback from review, and build a track record inside the network.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7 shadow-soft">
                  <span className="font-mono text-xs font-semibold tracking-widest text-brand-deep">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-12 flex justify-center">
            <Button asChild size="xl">
              <TrackedLink
                href={ctaLinks.joinNetwork}
                event="engineer_cta_clicked"
                eventProps={{ location: "engineers_footer" }}
              >
                {engineers.cta}
                <ButtonArrow />
              </TrackedLink>
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
