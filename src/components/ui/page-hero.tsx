import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent inner-page hero with the brand glow + grid backdrop. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border/70", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[110px] dark:bg-brand/10" />
      </div>
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-600 fill-mode-both">
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
            className={align === "left" ? "max-w-4xl" : "max-w-4xl"}
            titleClassName="text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[3.25rem] lg:text-[4rem]"
          />
        </div>
        {children ? (
          <div
            className={cn(
              "animate-in fade-in slide-in-from-bottom-4 mt-8 duration-600 fill-mode-both delay-150",
              align === "center" && "flex justify-center",
            )}
          >
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
