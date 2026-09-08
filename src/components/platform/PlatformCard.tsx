import { ArrowUpRightIcon } from "lucide-react";

import { PLATFORM_CATEGORIES, PLATFORM_TAGS, type Platform } from "@/data/platforms";

import { PlatformLink } from "./PlatformLink";
import { PlatformLogo } from "./PlatformLogo";

export function PlatformCard({ platform }: { platform: Platform }) {
  const category = PLATFORM_CATEGORIES[platform.category];
  const host = new URL(platform.url).hostname.replace(/^www\./, "");

  return (
    <li>
      <PlatformLink
        platform={platform}
        className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift focus-visible:border-brand"
        title={`Visit ${platform.name} (opens in a new tab)`}
      >
        <div className="flex h-16 items-center justify-start overflow-hidden">
          <PlatformLogo platform={platform} height={30} className="max-w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-lg font-bold tracking-tight">{platform.name}</p>
          <p className="text-sm text-muted-foreground">{category.label}</p>
          {platform.tags?.length ? (
            <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Tags">
              {platform.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-foreground/75"
                >
                  {PLATFORM_TAGS[t].label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-t border-border/70 pt-4 text-sm">
          <span className="font-mono text-xs text-muted-foreground">{host}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-deep">
            Visit Platform
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </PlatformLink>
    </li>
  );
}
