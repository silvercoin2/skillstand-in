import { CheckIcon } from "lucide-react";
import Link from "next/link";

import { RoleApplyButton } from "@/components/careers/RoleApplyButton";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import type { CareerRole } from "@/data/career-types";
import { getCareerRolePath } from "@/data/careers";
import { ctaLinks } from "@/data/navigation";

export function RoleDetail({ role, related }: { role: CareerRole; related: CareerRole[] }) {
  return (
    <>
      <PageHero eyebrow={role.headerCategory} title={role.title} description={role.shortDescription}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <RoleApplyButton role={role} showHint={false} />
          <ArrowLink href={ctaLinks.careers}>All open roles</ArrowLink>
        </div>
      </PageHero>

      <Section aria-labelledby="role-details-heading">
        <Container className="flex flex-col gap-12">
          <ul className="flex flex-wrap gap-2" aria-label="Role details">
            {[role.type, role.location, role.employment].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground/80"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex max-w-3xl flex-col gap-10">
            <section className="flex flex-col gap-3">
              <h2 id="role-details-heading" className="text-2xl font-bold tracking-tight">
                About the Role
              </h2>
              {role.about.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">What You&rsquo;ll Do</h2>
              <ul className="grid gap-2.5">
                {role.youWillDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight">What We&rsquo;re Looking For</h2>
              <ul className="grid gap-2.5">
                {role.lookingFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {role.lookingForNote ? (
                <p className="text-sm font-medium text-foreground/85">{role.lookingForNote}</p>
              ) : null}
            </section>

            {role.extraSections?.map((section) => (
              <section key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.items.length > 0 ? (
                  <ul className="grid gap-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                          <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {role.chips?.length ? (
              <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight">{role.helpfulHeading}</h2>
                {role.helpfulIntro ? (
                  <p className="text-sm text-muted-foreground">{role.helpfulIntro}</p>
                ) : null}
                <ul className="flex flex-wrap gap-2">
                  {role.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs font-medium text-foreground/85"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                {role.helpfulNote ? (
                  <p className="text-sm text-muted-foreground">{role.helpfulNote}</p>
                ) : null}
              </section>
            ) : null}

            <RoleApplyButton role={role} />
          </div>

          {related.length > 0 ? (
            <aside className="border-t border-border pt-10">
              <h2 className="text-lg font-bold tracking-tight">More {role.headerCategory} roles</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={getCareerRolePath(item.slug)}
                      className="text-sm font-medium text-brand-deep transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
