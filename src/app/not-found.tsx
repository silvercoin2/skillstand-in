import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { primaryNav } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-6 py-24 text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-[2.75rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-6xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          The link may be outdated or the address mistyped. Here is where you probably wanted to go.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/">
              Back to home
              <ButtonArrow />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
        <nav aria-label="Main pages" className="mt-4">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
