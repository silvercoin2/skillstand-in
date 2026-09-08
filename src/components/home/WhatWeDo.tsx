import { Container, Section } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatWeDo } from "@/data/content";

export function WhatWeDo() {
  return (
    <Section aria-labelledby="what-we-do-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title={<span id="what-we-do-heading">{whatWeDo.heading}</span>}
            description="Where automated pipelines run out of judgment, our contributors step in with real engineering depth."
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
  );
}
