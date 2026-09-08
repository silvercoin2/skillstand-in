import { ArrowDownIcon } from "lucide-react";
import type { ReactNode } from "react";

import { processDetailed } from "@/data/content";
import { cn } from "@/lib/utils";

function Node({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "hub" | "final";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-14 items-center justify-center rounded-2xl border px-6 py-3 text-center font-heading text-sm font-bold tracking-tight shadow-soft sm:text-base",
        variant === "default" && "border-border bg-card",
        variant === "hub" && "border-transparent bg-primary text-primary-foreground glow",
        variant === "final" && "border-brand/70 bg-accent text-accent-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-6 w-px bg-gradient-to-b from-border to-brand-strong/70" />
      <ArrowDownIcon className="-mt-1 size-4 text-brand-strong" />
    </div>
  );
}

/**
 * Typical contributor path for /how-it-works. Markup-only so it reads correctly
 * to screen readers; copy makes clear this is a common sequence, not a universal one.
 */
export function ProcessFlow({ className }: { className?: string }) {
  const [register, screening, assigned, paid] = processDetailed.stages;

  return (
    <div className={cn("relative mx-auto w-full max-w-2xl", className)}>
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <ol className="flex flex-col items-stretch" aria-label="Typical path from joining a platform to getting paid">
        <li className="flex flex-col items-center">
          <Node className="w-full max-w-xs">{register}</Node>
          <Connector />
        </li>
        <li className="flex flex-col items-center">
          <Node variant="hub" className="w-full max-w-xs">
            {screening}
          </Node>
          <p className="mt-2 text-center text-xs text-muted-foreground">Varies by platform</p>
          <Connector />
        </li>
        <li className="flex flex-col items-center">
          <Node className="w-full max-w-xs">{assigned}</Node>
          <ul
            className="mt-3 grid w-full grid-cols-2 gap-2 sm:grid-cols-5"
            aria-label="Examples of assigned work"
          >
            {processDetailed.branches.map((b, i) => (
              <li
                key={b}
                className={cn(
                  "flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-2 text-center text-xs font-semibold text-foreground/85 sm:text-[0.8rem]",
                  i === processDetailed.branches.length - 1 && "col-span-2 sm:col-span-1",
                )}
              >
                {b}
              </li>
            ))}
          </ul>
          <Connector />
        </li>
        <li className="flex flex-col items-center">
          <Node variant="final" className="w-full max-w-xs">
            {paid}
          </Node>
        </li>
      </ol>
    </div>
  );
}
