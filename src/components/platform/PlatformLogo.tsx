import Image from "next/image";

import type { LogoVariant, Platform } from "@/data/platforms";
import { cn } from "@/lib/utils";

/**
 * Theme-aware filter treatment so third-party marks stay legible in both
 * themes. Default state is monochrome; `group-hover` restores original colors
 * where that is possible (light theme). See LogoVariant docs in data/platforms.
 */
const VARIANT_CLASSES: Record<LogoVariant, string> = {
  dark: "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 dark:invert dark:opacity-80 dark:group-hover:opacity-100",
  color:
    "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-80 dark:group-hover:opacity-100",
  light:
    "brightness-0 opacity-75 group-hover:opacity-100 dark:brightness-100 dark:opacity-85 dark:group-hover:opacity-100",
  bw: "opacity-80 group-hover:opacity-100 dark:invert dark:opacity-85 dark:group-hover:opacity-100",
};

interface PlatformLogoProps {
  platform: Platform;
  /** Rendered height in px; width is fluid. */
  height?: number;
  className?: string;
}

export function PlatformLogo({ platform, height = 28, className }: PlatformLogoProps) {
  const variant = platform.logoVariant ?? "dark";

  if (platform.logo) {
    return (
      <span
        className={cn("relative flex items-center justify-center", className)}
        style={{ height }}
      >
        <Image
          src={platform.logo}
          alt={`${platform.name} logo`}
          width={Math.round(height * 4.5)}
          height={height}
          className={cn(
            "max-w-full object-contain transition-[filter,opacity] duration-300",
            VARIANT_CLASSES[variant],
          )}
          style={{ width: "auto", height: "100%" }}
          unoptimized={platform.logo.endsWith(".svg")}
        />
      </span>
    );
  }

  // Generated wordmark fallback — consistent typographic treatment so cards
  // with and without official art sit comfortably together.
  const initials = platform.name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <span
      className={cn("flex items-center gap-2.5", className)}
      style={{ height }}
      aria-label={platform.name}
    >
      {platform.mark ? (
        <Image
          src={platform.mark}
          alt=""
          width={height}
          height={height}
          className={cn(
            "shrink-0 object-contain transition-[filter,opacity] duration-300",
            VARIANT_CLASSES[variant],
          )}
          style={{ height: height * 0.9, width: "auto" }}
          unoptimized
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center justify-center rounded-md border border-border bg-surface font-heading text-[0.62em] font-bold tracking-tight text-muted-foreground transition-colors duration-300 group-hover:border-brand/50 group-hover:text-brand-deep"
          style={{ height: height * 0.9, width: height * 0.9, fontSize: height * 0.36 }}
        >
          {initials}
        </span>
      )}
      <span
        className="font-heading font-semibold tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground whitespace-nowrap"
        style={{ fontSize: Math.round(height * 0.62), lineHeight: 1 }}
      >
        {platform.name}
      </span>
    </span>
  );
}
