import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/data/content";

export function EngineeringCapabilities() {
  return (
    <Section
      aria-labelledby="capabilities-heading"
      className="relative overflow-hidden border-y border-border/70 bg-surface"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering Capabilities"
            title={<span id="capabilities-heading">{capabilities.heading}</span>}
            description={capabilities.description}
            align="center"
          />
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8">
          {capabilities.groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 80}>
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap justify-center gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-border bg-card px-4 py-2.5 font-mono text-sm font-medium text-foreground/90 shadow-soft transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:text-brand-deep"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
