import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import {
  PLATFORM_CATEGORIES,
  getPlatformsByCategory,
  type PlatformCategory,
} from "@/data/platforms";

const ORDER: PlatformCategory[] = ["engineering", "evaluation", "data", "emerging"];

export function PlatformEcosystem() {
  return (
    <Section aria-labelledby="platform-ecosystem-heading">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Platform Ecosystem"
            title={<span id="platform-ecosystem-heading">Platforms We Work Across</span>}
            description="The AI training ecosystem spans expert engineering networks, managed evaluation programs, and large-scale human data platforms. Our contributors bring engineering judgment to all of them."
          />
          <ArrowLink href="/platforms" className="shrink-0">
            Explore the directory
          </ArrowLink>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {ORDER.map((category, i) => {
            const meta = PLATFORM_CATEGORIES[category];
            const items = getPlatformsByCategory(category);
            return (
              <Reveal key={category} delay={i * 70}>
                <Link
                  href={`/platforms?filter=${category}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                      {String(items.length).padStart(2, "0")} platforms
                    </span>
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-deep"
                    />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{meta.label}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                    {meta.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {items.slice(0, 4).map((p) => (
                      <li
                        key={p.id}
                        className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-foreground/80"
                      >
                        {p.name}
                      </li>
                    ))}
                    {items.length > 4 ? (
                      <li className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{items.length - 4} more
                      </li>
                    ) : null}
                  </ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {siteConfig.disclaimerShort}
        </p>
      </Container>
    </Section>
  );
}
