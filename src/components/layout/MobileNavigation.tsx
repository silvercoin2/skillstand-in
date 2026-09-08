"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { TrackedLink } from "@/components/ui/tracked-link";
import { siteConfig } from "@/config/site";
import { ctaLinks, primaryNav } from "@/data/navigation";

import { LogoMark } from "./Logo";
import { NavLink } from "./NavLink";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-touch"
          className="xl:hidden"
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm gap-0 p-0">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="flex items-center gap-2.5 font-heading text-base font-bold">
            <LogoMark className="h-8" />
            {siteConfig.name}
          </SheetTitle>
          <SheetDescription>{siteConfig.tagline}</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col p-3">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t p-5">
          <Button asChild size="lg" className="w-full">
            <TrackedLink
              href={ctaLinks.workWithUs}
              event="company_cta_clicked"
              eventProps={{ location: "mobile_nav" }}
              onClick={() => setOpen(false)}
            >
              Work With Us
              <ButtonArrow />
            </TrackedLink>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <TrackedLink
              href={ctaLinks.joinNetwork}
              event="engineer_cta_clicked"
              eventProps={{ location: "mobile_nav" }}
              onClick={() => setOpen(false)}
            >
              Join Our Engineering Network
            </TrackedLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
