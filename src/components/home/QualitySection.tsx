import { Container, Section } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { quality } from "@/data/content";

/**
 * Trust section built on process, not invented metrics (PRD §16).
 * A metrics strip can be added here once real numbers exist.
 */
export function QualitySection() {
  return (
    <Section aria-labelledby="quality-heading" className="border-y border-border/70 bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Skill Stand In"
            title={<span id="quality-heading">{quality.heading}</span>}
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
  );
}
