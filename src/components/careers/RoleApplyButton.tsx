"use client";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { siteConfig } from "@/config/site";
import type { CareerRole } from "@/data/career-types";
import { currentPath, track } from "@/lib/analytics";

function applyHref(role: CareerRole): string {
  if (role.applyUrl) return role.applyUrl;
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;
}

export function RoleApplyButton({
  role,
  size = "xl",
  showHint = true,
}: {
  role: CareerRole;
  size?: "lg" | "xl";
  showHint?: boolean;
}) {
  const href = applyHref(role);
  const isExternal = href.startsWith("http");

  return (
    <div>
      <Button asChild size={size}>
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
      {showHint ? (
        isExternal ? (
          <p className="mt-3 text-xs text-muted-foreground">Opens the application form in a new tab.</p>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            This will open an email to {siteConfig.contactEmail}.
          </p>
        )
      ) : null}
    </div>
  );
}
