import type { Metadata } from "next";

import { FinalCTA } from "@/components/home/FinalCTA";
import { ProcessFlow } from "@/components/process/ProcessFlow";
import { ProcessStep } from "@/components/process/ProcessStep";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processDetailed } from "@/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How It Works",
  description:
    "A simple path from joining an AI training platform to completing technical work and getting paid. Screening, assignments, and payment timing vary by platform.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={processDetailed.heading}
        description={processDetailed.description}
      />

      <Section aria-labelledby="flow-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="The Flow"
                title={<span id="flow-heading">{processDetailed.flowHeading}</span>}
                description={processDetailed.flowDescription}
              />
            </Reveal>
            <Reveal delay={120}>
              <ProcessFlow />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="steps-heading" className="border-y border-border/70 bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Step by Step"
              title={<span id="steps-heading">Four steps, with room for platform differences</span>}
              description="Use this as a map of what typically happens — not a promise that every platform runs the same playbook."
            />
          </Reveal>
          <Reveal delay={100}>
            <ol className="mt-12 flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
              {processDetailed.steps.map((step, i) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isLast={i === processDetailed.steps.length - 1}
                />
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA
        heading="Ready to put your engineering skills to work?"
        description="Join the network and we will help you find platforms and projects that fit your background."
      />
    </>
  );
}
