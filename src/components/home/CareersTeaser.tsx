import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getCareerRolePath, getCareerRolesByCategory, getCareersTeaser } from "@/data/careers";
import { ctaLinks } from "@/data/navigation";

export function CareersTeaser() {
  const careersTeaser = getCareersTeaser();
  const roleGroups = getCareerRolesByCategory();
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
          {roleGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 80}>
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold tracking-tight">{group.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                </div>
                <ul className="flex flex-col gap-1">
                  {group.roles.map((role) => (
                    <li key={role.slug}>
                      <Link
                        href={getCareerRolePath(role.slug)}
                        className="group flex items-center justify-between gap-3 rounded-lg py-2 text-[0.95rem] font-medium text-foreground/90 transition-colors hover:text-brand-deep"
                      >
                        <span>{role.title}</span>
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-deep"
                        />
                      </Link>
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
