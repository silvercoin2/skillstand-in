import Link from "next/link";

import { cn } from "@/lib/utils";

export type ContactMode = "company" | "engineer";

export function parseContactMode(value: string | string[] | undefined): ContactMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "engineer" ? "engineer" : "company";
}

const OPTIONS: { value: ContactMode; href: string; label: string; hint: string }[] = [
  {
    value: "company",
    href: "/contact?mode=company",
    label: "I Have a Project",
    hint: "Company inquiry",
  },
  {
    value: "engineer",
    href: "/contact?mode=engineer",
    label: "I Want to Join",
    hint: "Engineer application",
  },
];

export function ContactModeToggle({ mode }: { mode: ContactMode }) {
  return (
    <div
      role="tablist"
      aria-label="Choose how you want to get in touch"
      className="grid gap-2 rounded-2xl border border-border bg-surface p-1.5 sm:grid-cols-2"
    >
      {OPTIONS.map((option) => {
        const selected = option.value === mode;
        return (
          <Link
            key={option.value}
            href={option.href}
            role="tab"
            aria-selected={selected}
            scroll={false}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center rounded-xl px-4 py-3 text-center transition-colors",
              selected
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-foreground/75 hover:bg-card hover:text-foreground",
            )}
          >
            <span className="text-sm font-semibold sm:text-[0.95rem]">{option.label}</span>
            <span className={cn("text-[11px]", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {option.hint}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
