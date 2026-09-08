import Link from "next/link";
import { MailIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";

import { BrandLockup } from "./Logo";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${siteConfig.contactEmail}`, Icon: MailIcon },
];

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <BrandLockup />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Engineering expertise for the AI training ecosystem.
            </p>
            <ul className="flex items-center gap-1.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm font-medium text-foreground/85 transition-colors hover:text-brand-deep"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-8 text-xs leading-relaxed text-muted-foreground lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <p className="shrink-0">© {siteConfig.foundedYear} {siteConfig.name}. All rights reserved.</p>
          <p className="max-w-3xl">{siteConfig.disclaimerLong}</p>
        </div>
      </Container>
    </footer>
  );
}
