import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/ui/tracked-link";
import { finalCta } from "@/data/content";
import { ctaLinks } from "@/data/navigation";

interface FinalCTAProps {
  heading?: string;
  description?: string;
  primary?: string;
  secondary?: string;
}

/** Large light-green gradient CTA band (PRD §18). Reused on inner pages. */
export function FinalCTA({
  heading = finalCta.heading,
  description = finalCta.description,
  primary = finalCta.primary,
  secondary = finalCta.secondary,
}: FinalCTAProps) {
  return (
    <section aria-labelledby="final-cta-heading" className="py-6 sm:py-10">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/35 via-surface to-accent px-6 py-16 text-center shadow-soft sm:px-12 sm:py-20 dark:from-brand/20 dark:via-surface dark:to-elevated">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/40 blur-3xl dark:bg-brand/20"
            />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
              <h2
                id="final-cta-heading"
                className="text-[2.25rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {heading}
              </h2>
              <p className="max-w-xl text-lg text-muted-foreground">{description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl">
                  <TrackedLink
                    href={ctaLinks.workWithUs}
                    event="company_cta_clicked"
                    eventProps={{ location: "final_cta" }}
                  >
                    {primary}
                    <ButtonArrow />
                  </TrackedLink>
                </Button>
                <Button asChild size="xl" variant="outline" className="bg-background/70">
                  <TrackedLink
                    href={ctaLinks.joinNetwork}
                    event="engineer_cta_clicked"
                    eventProps={{ location: "final_cta" }}
                  >
                    {secondary}
                  </TrackedLink>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
