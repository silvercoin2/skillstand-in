import type { Metadata } from "next";

import { CONTACT_FORMS_ENABLED, ContactSubmission } from "@/components/forms/ContactSubmission";
import { parseContactMode } from "@/components/forms/ContactModeToggle";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

type ContactSearch = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: ContactSearch;
}): Promise<Metadata> {
  const { mode } = await searchParams;
  const isEngineer = parseContactMode(mode) === "engineer";

  if (!CONTACT_FORMS_ENABLED) {
    return buildMetadata({
      title: "Contact",
      description: `Email ${siteConfig.name} at ${siteConfig.contactEmail} about AI training, evaluation, or engineering work.`,
      path: "/contact",
    });
  }

  return buildMetadata({
    title: isEngineer ? "Join Our Engineering Network" : "Work With Us",
    description: isEngineer
      ? `Apply to join the ${siteConfig.name} engineering network. Share your background, skills, and résumé for AI training, evaluation, and human-feedback projects.`
      : `Tell ${siteConfig.name} about your AI training, evaluation, or engineering project. We'll review the scope and get back to you.`,
    path: isEngineer ? "/contact?mode=engineer" : "/contact",
  });
}

export default async function ContactPage({ searchParams }: { searchParams: ContactSearch }) {
  const { mode } = await searchParams;
  const current = parseContactMode(mode);
  const isEngineer = current === "engineer";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          CONTACT_FORMS_ENABLED
            ? isEngineer
              ? "Join Our Engineering Network"
              : "Work With Us"
            : "Contact Skill Stand In"
        }
        description={
          CONTACT_FORMS_ENABLED
            ? isEngineer
              ? "Tell us about your background. We review every application ourselves and reach out when a project matches your skills."
              : "Share the scope, timeline, and quality bar. We'll come back with how we would staff and review the work."
            : "Write to us about a project or to join the engineering network. We read every message."
        }
      />

      <Section aria-labelledby="contact-form-heading">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <ContactSubmission mode={current} />
          </div>
        </Container>
      </Section>
    </>
  );
}
