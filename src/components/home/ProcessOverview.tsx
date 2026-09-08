import { ArrowLink } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/process/ProcessStep";
import { processOverview } from "@/data/content";
import { ctaLinks } from "@/data/navigation";

export function ProcessOverview() {
  return (
    <Section id="how-it-works" aria-labelledby="process-heading" className="scroll-mt-20">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Process"
            title={<span id="process-heading">{processOverview.heading}</span>}
            description={processOverview.description}
          />
          <ArrowLink
            href={ctaLinks.howItWorks}
            event="how_it_works_clicked"
            eventProps={{ location: "home_process" }}
            className="shrink-0"
          >
            {processOverview.cta}
          </ArrowLink>
        </Reveal>
        <Reveal delay={100}>
          <ol className="mt-12 flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
            {processOverview.steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                isLast={i === processOverview.steps.length - 1}
              />
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
