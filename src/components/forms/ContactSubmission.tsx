import { MailIcon } from "lucide-react";

import { CompanyInquiryForm } from "@/components/forms/CompanyInquiryForm";
import { ContactModeToggle, type ContactMode } from "@/components/forms/ContactModeToggle";
import { EngineerApplicationForm } from "@/components/forms/EngineerApplicationForm";
import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { siteConfig } from "@/config/site";

/**
 * Flip to `true` when Resend (or another mail provider) is sending again.
 * Forms stay in the repo; this only controls whether they render.
 */
export const CONTACT_FORMS_ENABLED = false;

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ContactDirectInfo() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:p-10">
      <h2 id="contact-form-heading" className="text-2xl font-bold tracking-tight">
        Get in touch
      </h2>
      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
        Email us about a project or to join the network. We read every message and reply when we
        can help.
      </p>
      <dl className="mt-8 grid gap-5">
        <div className="flex flex-col gap-1.5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Email
          </dt>
          <dd>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-lg font-semibold text-brand-deep underline underline-offset-4"
            >
              {siteConfig.contactEmail}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            LinkedIn
          </dt>
          <dd>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/90 underline underline-offset-4 hover:text-brand-deep"
            >
              Skill Stand In
            </a>
          </dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="xl">
          <a href={`mailto:${siteConfig.contactEmail}`}>
            <MailIcon data-icon="inline-start" />
            Email us
            <ButtonArrow />
          </a>
        </Button>
        <Button asChild size="xl" variant="outline">
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon className="size-[18px]" />
            LinkedIn
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ContactSubmission({ mode }: { mode: ContactMode }) {
  if (!CONTACT_FORMS_ENABLED) {
    return <ContactDirectInfo />;
  }

  const isEngineer = mode === "engineer";

  return (
    <>
      <ContactModeToggle mode={mode} />
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
    </>
  );
}
