"use client";

import type { ComponentProps, MouseEvent } from "react";

import type { Platform } from "@/data/platforms";
import { currentPath, track } from "@/lib/analytics";

type PlatformLinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & {
  platform: Platform;
};

/** External link to a platform with security attrs + `platform_clicked` tracking. */
export function PlatformLink({ platform, onClick, children, ...props }: PlatformLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track("platform_clicked", {
      platform_name: platform.name,
      platform_category: platform.category,
      source_page: currentPath(),
    });
    onClick?.(e);
  }

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
