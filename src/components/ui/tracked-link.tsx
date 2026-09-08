"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { track, currentPath, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: AnalyticsEvent;
  eventProps?: AnalyticsProps;
};

/** `next/link` that fires a single conversion event on click. */
export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track(event, { ...eventProps, source_page: currentPath() });
    onClick?.(e);
  }
  return <Link onClick={handleClick} {...props} />;
}
