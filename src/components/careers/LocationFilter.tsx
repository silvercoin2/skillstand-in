"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  CAREER_REGIONS,
  getCareerListingPath,
  isCareerRegion,
  type CareerRegion,
} from "@/data/career-regions";
import { cn } from "@/lib/utils";

function hashRegion() {
  if (typeof window === "undefined") return undefined;
  const hash = window.location.hash.replace(/^#/, "").replace(/^location=/i, "");
  return isCareerRegion(hash) ? hash : undefined;
}

export function LocationFilter({ current }: { current: CareerRegion }) {
  const router = useRouter();

  useEffect(() => {
    const fromHash = hashRegion();
    if (!fromHash || fromHash === current) return;
    router.replace(`${getCareerListingPath(fromHash)}#${fromHash}`, { scroll: false });
  }, [current, router]);

  return (
    <div
      role="group"
      aria-label="Filter roles by location"
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {CAREER_REGIONS.map((region) => {
        const active = region.id === current;
        return (
          <Link
            key={region.id}
            href={`${getCareerListingPath(region.id)}#${region.id}`}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 shrink-0 items-center rounded-xl border px-4 text-sm font-semibold transition-colors",
              active
                ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card text-foreground/80 hover:border-brand/50 hover:text-foreground",
            )}
          >
            {region.label}
          </Link>
        );
      })}
    </div>
  );
}
