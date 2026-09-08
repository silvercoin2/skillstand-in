import { Button } from "@/components/ui/button";
import { ArrowLink, ButtonArrow } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/ui/tracked-link";
import { hero } from "@/data/content";
import { ctaLinks } from "@/data/navigation";

import { HeroFlow } from "./HeroFlow";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] dark:bg-brand/10" />
      </div>
      <Container className="grid min-h-[min(calc(100svh-4rem),960px)] items-center gap-12 py-16 lg:min-h-[min(calc(100svh-72px),960px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="flex max-w-2xl flex-col gap-7">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="animate-in fade-in slide-in-from-bottom-4 text-[2.75rem] leading-[1.03] font-extrabold tracking-[-0.03em] duration-600 fill-mode-both delay-75 sm:text-6xl lg:text-[4.75rem]">
            Human Engineering Expertise for{" "}
            <span className="relative inline-block text-brand-deep">
              Better AI
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[0.18em] rounded-full bg-brand/60 dark:bg-brand/40"
              />
            </span>
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom-4 max-w-xl text-lg leading-relaxed text-muted-foreground duration-600 fill-mode-both delay-150 sm:text-xl">
            {hero.description}
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-3 duration-600 fill-mode-both delay-200 sm:flex-row sm:items-center">
            <Button asChild size="xl">
              <TrackedLink
                href={ctaLinks.workWithUs}
                event="company_cta_clicked"
                eventProps={{ location: "hero" }}
              >
                {hero.primaryCta}
                <ButtonArrow />
              </TrackedLink>
            </Button>
            <Button asChild size="xl" variant="outline">
              <TrackedLink
                href={ctaLinks.joinNetwork}
                event="engineer_cta_clicked"
                eventProps={{ location: "hero" }}
              >
                {hero.secondaryCta}
              </TrackedLink>
            </Button>
          </div>
          <div className="animate-in fade-in duration-700 fill-mode-both delay-300">
            <ArrowLink
              href="#how-it-works"
              direction="down"
              event="how_it_works_clicked"
              eventProps={{ location: "hero" }}
            >
              {hero.tertiaryCta}
            </ArrowLink>
          </div>
        </div>

        <div className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both delay-150 lg:justify-self-end">
          <HeroFlow className="mx-auto w-full max-w-[480px] lg:max-w-[600px]" />
        </div>
      </Container>
    </section>
  );
}
