import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import type { CareerRole } from "@/data/career-types";
import { getCareerRolePath } from "@/data/careers";

export function RoleList({ roles }: { roles: CareerRole[] }) {
  return (
    <ul className="grid gap-4">
      {roles.map((role) => (
        <li key={role.slug}>
          <Link
            href={getCareerRolePath(role.slug)}
            className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-card px-6 py-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift sm:px-8 sm:py-7"
          >
            <span className="flex items-start justify-between gap-4">
              <span className="flex min-w-0 flex-col gap-2">
                <span className="font-heading text-xl font-bold tracking-tight sm:text-2xl">{role.title}</span>
                <span className="text-sm text-muted-foreground">
                  {role.headerCategory} · {role.location} · {role.employment}
                  {role.compensation ? ` · ${role.compensation}` : ""}
                </span>
              </span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-deep"
              />
            </span>
            <span className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {role.shortDescription}
            </span>
            <span className="text-sm font-semibold text-brand-deep">View role</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
