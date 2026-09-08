import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { careerRoles, careersTeaser } from "@/data/careers";
import { ctaLinks } from "@/data/navigation";

export function CareersTeaser() {
  return (
    <Section aria-labelledby="careers-teaser-heading" className="border-y border-border/70 bg-surface">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={careersTeaser.eyebrow}
            title={<span id="careers-teaser-heading">{careersTeaser.title}</span>}
            description={careersTeaser.description}
          />
          <Button asChild size="lg" className="shrink-0 self-start lg:self-auto">
            <TrackedLink href={ctaLinks.careers} event="careers_cta_clicked" eventProps={{ location: "home_teaser" }}>
              {careersTeaser.cta}
              <ButtonArrow />
            </TrackedLink>
          </Button>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
          {careerRoles.map((role, i) => (
            <Reveal key={role.slug} delay={i * 80}>
              <Link
                href={`${ctaLinks.careers}#${role.slug}`}
                className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight">{role.title}</h3>
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-deep"
                  />
                </div>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{role.shortDescription}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
                  Learn More
                  <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
