import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
  icon?: LucideIcon;
  index?: string;
  className?: string;
}

/** Minimal-line-icon card with subtle hover elevation (PRD §8, §22). */
export function FeatureCard({ title, description, icon: Icon, index, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
          <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-brand-deep transition-colors duration-300 group-hover:border-brand/60 group-hover:bg-accent">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
        ) : null}
        {index ? (
          <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
            {index}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
