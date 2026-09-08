"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

import { currentPath, track, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  direction?: "right" | "down";
  event?: AnalyticsEvent;
  eventProps?: AnalyticsProps;
};

/** Text link with the PRD "arrow nudge" micro-interaction and optional tracking. */
export function ArrowLink({
  className,
  children,
  direction = "right",
  event,
  eventProps,
  onClick,
  ...props
}: ArrowLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (event) track(event, { ...eventProps, source_page: currentPath() });
    onClick?.(e);
  }

  return (
    <Link
      className={cn(
        "group/arrow inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-deep transition-colors hover:text-foreground",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className={cn(
          "size-4 transition-transform duration-200",
          direction === "right" && "group-hover/arrow:translate-x-1",
          direction === "down" && "rotate-90 group-hover/arrow:translate-y-1",
        )}
      />
    </Link>
  );
}

/** Icon-only arrow used inside buttons (nudges on hover of the button). */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <ArrowRightIcon
      aria-hidden="true"
      data-icon="inline-end"
      className={cn(
        "transition-transform duration-200 group-hover/button:translate-x-0.5",
        className,
      )}
    />
  );
}
