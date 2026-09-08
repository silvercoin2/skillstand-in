import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Prose } from "@/components/ui/prose";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

const LAST_UPDATED = "September 8, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${LAST_UPDATED}. This policy explains what we collect through this website, why, and the choices you have.`}
      />
      <Section>
        <Container>
          <Prose>
            {/* TODO(legal): template copy — have counsel review before launch. */}
            <h2>1. Who we are</h2>
            <p>
              {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an independent software
              engineering agency. This website ({siteConfig.url}) is our marketing site and the way
              companies and engineers contact us. You can reach us at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>

            <h2>2. Information we collect</h2>
            <h3>Information you provide</h3>
            <p>When you submit a form on this site we collect what you enter, which may include:</p>
            <ul>
              <li>
                <strong>Company inquiries:</strong> your name, work email, company name, role,
                project type, team size, timeline, budget range, and your project description.
              </li>
              <li>
                <strong>Engineer applications:</strong> your name, email, location, primary
                skills, years of experience, LinkedIn or portfolio links, GitHub profile, a résumé
                (file or link), and any message you include.
              </li>
              <li>
                <strong>Career applications:</strong> when you apply for an open role, you are
                taken to a Google Form. Google collects the information you enter there under its
                own terms; we use that submission to evaluate your application.
              </li>
            </ul>
            <h3>Information collected automatically</h3>
            <p>
              We use privacy-focused, cookie-free web analytics to understand aggregate usage
              (pages viewed, referrers, device type, country) and to measure conversion events such
              as form submissions. We use Cloudflare Turnstile to protect our forms from automated
              abuse; Turnstile may process connection data such as your IP address to make that
              determination. We store your theme preference (light/dark/system) in your browser&rsquo;s
              local storage; it is never sent to us.
            </p>

            <h2>3. How we use information</h2>
            <ul>
              <li>To respond to project inquiries and evaluate potential engagements.</li>
              <li>To review engineer applications and contact applicants about opportunities.</li>
              <li>To operate, secure, and improve this website.</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell personal information and we do not use it for advertising.
            </p>

            <h2>4. Legal bases (EEA/UK visitors)</h2>
            <p>
              Where the GDPR or UK GDPR applies, we process form submissions on the basis of our
              legitimate interest in responding to inquiries and evaluating candidates, or to take
              steps at your request before entering into a contract. Security and analytics
              processing is based on our legitimate interest in operating a secure, functional
              website.
            </p>

            <h2>5. Sharing</h2>
            <p>We share information only with service providers that help us run this site:</p>
            <ul>
              <li>Email delivery (to deliver form submissions to our inbox).</li>
              <li>Career application forms hosted by Google.</li>
              <li>Hosting and content delivery.</li>
              <li>Spam and abuse protection.</li>
              <li>Web analytics.</li>
            </ul>
            <p>
              These providers process data on our behalf under contractual obligations. We may also
              disclose information where required by law.
            </p>

            <h2>6. Retention</h2>
            <p>
              Company inquiries are retained for as long as needed to evaluate and, where relevant,
              deliver an engagement. Engineer applications and career applications are retained for
              up to 24 months so we can consider you for future projects, unless you ask us to
              delete them sooner.
            </p>

            <h2>7. Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, delete, or
              receive a copy of your personal information, to object to or restrict processing, and
              to lodge a complaint with a supervisory authority. To exercise these rights, email{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>

            <h2>8. International transfers</h2>
            <p>
              Our providers may process data in countries other than your own. Where required, we
              rely on appropriate safeguards such as standard contractual clauses.
            </p>

            <h2>9. Third-party platforms</h2>
            <p>
              This site names and links to third-party AI training and data platforms for
              informational purposes. {siteConfig.disclaimerLong} Their websites are governed by
              their own privacy policies.
            </p>

            <h2>10. Changes</h2>
            <p>
              We will post any changes to this policy on this page and update the date above.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
