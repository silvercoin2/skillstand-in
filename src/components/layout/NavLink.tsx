"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type NavLinkProps = ComponentProps<typeof Link> & { exact?: boolean };

export function NavLink({ href, className, exact = false, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const target = typeof href === "string" ? href : href.pathname ?? "";
  const active = exact ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(className)}
      data-active={active ? "true" : undefined}
      {...props}
    />
  );
}
