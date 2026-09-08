import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ctaLinks, primaryNav } from "@/data/navigation";

import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/65">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="relative flex min-h-11 items-center rounded-lg px-2.5 text-[0.875rem] font-medium text-foreground/75 transition-colors hover:text-foreground data-[active=true]:text-foreground after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-brand-strong after:opacity-0 after:transition-opacity data-[active=true]:after:opacity-100"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <TrackedLink
              href={ctaLinks.workWithUs}
              event="company_cta_clicked"
              eventProps={{ location: "header" }}
            >
              Work With Us
              <ButtonArrow />
            </TrackedLink>
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
