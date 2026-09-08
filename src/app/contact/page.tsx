import type { Metadata } from "next";

import { CompanyInquiryForm } from "@/components/forms/CompanyInquiryForm";
import { ContactModeToggle, parseContactMode } from "@/components/forms/ContactModeToggle";
import { EngineerApplicationForm } from "@/components/forms/EngineerApplicationForm";
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
        title={isEngineer ? "Join Our Engineering Network" : "Work With Us"}
        description={
          isEngineer
            ? "Tell us about your background. We review every application ourselves and reach out when a project matches your skills."
            : "Share the scope, timeline, and quality bar. We'll come back with how we would staff and review the work."
        }
      />

      <Section aria-labelledby="contact-form-heading">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <ContactModeToggle mode={current} />
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:p-10">
              <h2 id="contact-form-heading" className="sr-only">
                {isEngineer ? "Engineer application form" : "Company inquiry form"}
              </h2>
              {isEngineer ? <EngineerApplicationForm /> : <CompanyInquiryForm />}
            </div>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Prefer email? Write to{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium text-brand-deep underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
