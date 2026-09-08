import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Official ribbon-S mark, cropped from the brand lockup. */
const MARK = {
  src: "/brand/mark.png",
  width: 269,
  height: 389,
} as const;

export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex h-8 shrink-0", className)}>
      <Image
        src={MARK.src}
        alt=""
        width={MARK.width}
        height={MARK.height}
        className="h-full w-auto"
        style={{ width: "auto", height: "100%" }}
        priority={priority}
      />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-h-11 items-center gap-2.5 rounded-lg font-heading text-[1.05rem] font-bold tracking-tight",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoMark className="h-9" priority />
      <span>{siteConfig.name}</span>
    </Link>
  );
}

/** Vertical lockup for the footer: mark, wordmark, official tagline. */
export function BrandLockup({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex flex-col items-start gap-2", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoMark className="h-14" />
      <span className="font-heading text-lg font-bold tracking-tight">{siteConfig.name}</span>
      <span className="text-[0.65rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        {siteConfig.tagline}
      </span>
    </Link>
  );
}
