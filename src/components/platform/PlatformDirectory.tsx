"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useId, useMemo, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import {
  PLATFORM_FILTERS,
  filterPlatforms,
  type PlatformFilter,
} from "@/data/platforms";
import { cn } from "@/lib/utils";

import { PlatformCard } from "./PlatformCard";

export function PlatformDirectory({
  filter,
  query: queryFromUrl,
}: {
  filter: PlatformFilter;
  query: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const searchId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState(queryFromUrl);

  const results = useMemo(() => filterPlatforms(filter, query), [filter, query]);

  const updateParams = useCallback(
    (next: { filter?: PlatformFilter; q?: string }) => {
      const params = new URLSearchParams();
      const nextFilter = next.filter ?? filter;
      const nextQuery = next.q !== undefined ? next.q : query;
      if (nextFilter !== "all") params.set("filter", nextFilter);
      if (nextQuery.trim()) params.set("q", nextQuery);
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [filter, pathname, query, router],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter platforms by category"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {PLATFORM_FILTERS.map((f) => {
            const active = f.value === filter;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => updateParams({ filter: f.value })}
                className={cn(
                  "flex h-11 shrink-0 items-center rounded-xl border px-4 text-sm font-semibold transition-colors",
                  active
                    ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground/80 hover:border-brand/50 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Search platforms
          </label>
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id={searchId}
            type="search"
            placeholder="Search platforms…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams({ q: e.target.value });
            }}
            className="h-11 rounded-xl bg-card pr-10 pl-10 text-base md:text-sm"
            aria-controls={resultsId}
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                updateParams({ q: "" });
              }}
              className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
        Showing {results.length} {results.length === 1 ? "platform" : "platforms"}
        {filter !== "all" ? ` in ${PLATFORM_FILTERS.find((f) => f.value === filter)?.label}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      {results.length > 0 ? (
        <ul id={resultsId} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {results.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </ul>
      ) : (
        <div
          id={resultsId}
          className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center"
        >
          <p className="text-lg font-semibold">No platforms match that search.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different term or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              updateParams({ q: "", filter: "all" });
            }}
            className="mt-6 inline-flex h-11 items-center rounded-xl border border-border bg-card px-4 text-sm font-semibold hover:border-brand/50"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
