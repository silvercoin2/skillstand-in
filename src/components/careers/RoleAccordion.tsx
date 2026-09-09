"use client";

import { useEffect, useId, useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { siteConfig } from "@/config/site";
import type { CareerRole } from "@/data/career-types";
import { currentPath, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function applyHref(role: CareerRole): string {
  if (role.applyUrl) return role.applyUrl;
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground"
      aria-hidden="true"
    >
      <span className="absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current" />
      <span
        className={cn(
          "absolute top-3 bottom-3 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-out",
          open && "scale-y-0",
        )}
      />
    </span>
  );
}

function RoleCard({
  role,
  open,
  onToggle,
}: {
  role: CareerRole;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const headerId = useId();
  const href = applyHref(role);
  const isExternal = href.startsWith("http");

  return (
    <article
      id={role.slug}
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-6 py-6 text-left sm:px-8 sm:py-7"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="font-heading text-xl font-bold tracking-tight sm:text-2xl">{role.title}</span>
            <span className="text-sm text-muted-foreground">
              {role.headerCategory} · {role.location} · Flexible
            </span>
          </span>
          <PlusMinus open={open} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-8 border-t border-border px-6 py-8 sm:px-8 sm:py-10">
            <p className="max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
              {role.shortDescription}
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Role details">
              {[role.type, role.location, role.employment].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>

            <section className="flex flex-col gap-3">
              <h4 className="text-lg font-bold tracking-tight">About the Role</h4>
              {role.about.map((p) => (
                <p key={p} className="max-w-3xl leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>

            <section className="flex flex-col gap-4">
              <h4 className="text-lg font-bold tracking-tight">What You&rsquo;ll Do</h4>
              <ul className="grid gap-2.5">
                {role.youWillDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h4 className="text-lg font-bold tracking-tight">What We&rsquo;re Looking For</h4>
              <ul className="grid gap-2.5">
                {role.lookingFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {role.lookingForNote ? (
                <p className="text-sm font-medium text-foreground/85">{role.lookingForNote}</p>
              ) : null}
            </section>

            {role.chips?.length ? (
              <section className="flex flex-col gap-4">
                <h4 className="text-lg font-bold tracking-tight">{role.helpfulHeading}</h4>
                <p className="text-sm text-muted-foreground">{role.helpfulIntro}</p>
                <ul className="flex flex-wrap gap-2">
                  {role.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs font-medium text-foreground/85"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                {role.helpfulNote ? (
                  <p className="text-sm text-muted-foreground">{role.helpfulNote}</p>
                ) : null}
              </section>
            ) : null}

            <div>
              <Button asChild size="xl">
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() =>
                    track("career_apply_clicked", {
                      role: role.slug,
                      destination: isExternal ? "google_form" : "mailto",
                      source_page: currentPath(),
                    })
                  }
                >
                  {role.applyLabel}
                  <ButtonArrow />
                </a>
              </Button>
              {isExternal ? (
                <p className="mt-3 text-xs text-muted-foreground">Opens the application form in a new tab.</p>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  The Google Form URL is not configured yet. This will open an email to{" "}
                  {siteConfig.contactEmail}.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RoleAccordion({ roles }: { roles: CareerRole[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    function applyHash() {
      const slug = window.location.hash.replace(/^#/, "");
      if (!slug || !roles.some((r) => r.slug === slug)) return;
      setOpenSlug(slug);
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [roles]);

  return (
    <div className="flex flex-col gap-4">
      {roles.map((role) => (
        <RoleCard
          key={role.slug}
          role={role}
          open={openSlug === role.slug}
          onToggle={() => setOpenSlug((current) => (current === role.slug ? null : role.slug))}
        />
      ))}
    </div>
  );
}
