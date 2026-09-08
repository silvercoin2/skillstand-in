import type { Metadata } from "next";
import { InfoIcon } from "lucide-react";

import { FinalCTA } from "@/components/home/FinalCTA";
import { PlatformDirectory } from "@/components/platform/PlatformDirectory";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
import { activePlatforms, isPlatformFilter } from "@/data/platforms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Platforms — The AI Training Ecosystem",
  description:
    "A directory of AI training, evaluation, and human-data platforms our engineers work across, from expert engineering networks to large-scale task marketplaces.",
  path: "/platforms",
});

export default async function PlatformsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawFilter = Array.isArray(params.filter) ? params.filter[0] : params.filter;
  const filter = rawFilter && isPlatformFilter(rawFilter) ? rawFilter : "all";
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;

  return (
    <>
      <PageHero
        eyebrow="Platforms"
        title="The AI Training Ecosystem"
        description={`A directory of ${activePlatforms.length} AI training, evaluation, and human-data platforms our engineers work across. Filter by category or search by name.`}
      >
        <div
          role="note"
          className="flex max-w-3xl items-start gap-3 rounded-2xl border border-brand/40 bg-accent/60 px-5 py-4 text-sm leading-relaxed text-accent-foreground dark:bg-accent/40"
        >
          <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-semibold">Independence notice.</strong> {siteConfig.disclaimerShort}{" "}
            Logos and names are the property of their respective owners and are shown for identification only.
          </p>
        </div>
      </PageHero>

      <Section aria-labelledby="platform-directory-heading">
        <Container>
          <h2 id="platform-directory-heading" className="sr-only">
            Platform directory
          </h2>
          <PlatformDirectory filter={filter} query={rawQuery ?? ""} />
        </Container>
      </Section>

      <FinalCTA
        heading="Working on one of these platforms and need engineers?"
        description="We bring experienced technical contributors into AI training and evaluation projects across the ecosystem."
      />
    </>
  );
}
