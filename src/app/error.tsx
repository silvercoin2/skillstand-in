"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in the console for now; wire to an error tracker when one is adopted.
    console.error(error);
  }, [error]);

  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-6 py-24 text-center">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="text-[2.75rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-6xl">
          We hit an unexpected error.
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          You can try again, or head back to the homepage. If this keeps happening, please let us know.
        </p>
        {error.digest ? (
          <p className="font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="xl" onClick={reset}>
            Try again
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
