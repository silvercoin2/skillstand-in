import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlatformLink } from "@/components/platform/PlatformLink";
import { PlatformLogo } from "@/components/platform/PlatformLogo";
import { siteConfig } from "@/config/site";
import { marquee } from "@/data/content";
import { getFeaturedPlatforms, getSecondaryPlatforms, type Platform } from "@/data/platforms";
import { cn } from "@/lib/utils";

function MarqueeRow({
  items,
  direction,
  duration,
  ariaHidden,
}: {
  items: Platform[];
  direction: "left" | "right";
  duration: number;
  ariaHidden?: boolean;
}) {
  // Track is duplicated once; the keyframe translates exactly -50% so the
  // loop is seamless regardless of content width.
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden" aria-hidden={ariaHidden}>
      <ul
        className={cn(
          "flex w-max gap-3 py-1 will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] sm:gap-4",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((p, i) => (
          <li key={`${p.id}-${i}`} className="shrink-0">
            <PlatformLink
              platform={p}
              tabIndex={ariaHidden || i >= items.length ? -1 : 0}
              aria-hidden={i >= items.length ? true : undefined}
              className="group flex h-[68px] min-w-[176px] items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-lift focus-visible:border-brand"
              title={`Visit ${p.name} (opens in a new tab)`}
            >
              <PlatformLogo platform={p} height={26} className="max-w-[184px]" />
            </PlatformLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlatformMarquee() {
  const row1 = getFeaturedPlatforms();
  const row2 = getSecondaryPlatforms();

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="border-y border-border/70 bg-surface py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="AI Training Ecosystem"
          title={<span id="ecosystem-heading">{marquee.heading}</span>}
          description={marquee.description}
          align="center"
          className="mb-12"
        />
      </Container>
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" duration={42} />
        <MarqueeRow items={row2} direction="right" duration={48} />
      </div>
      <Container>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {siteConfig.disclaimerShort}
        </p>
      </Container>
    </section>
  );
}
