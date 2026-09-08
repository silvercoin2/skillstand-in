import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Prose } from "@/components/ui/prose";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `The terms that govern use of the ${siteConfig.name} website.`,
  path: "/terms",
});

const LAST_UPDATED = "September 8, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description={`Last updated ${LAST_UPDATED}. By using this website you agree to these terms.`}
      />
      <Section>
        <Container>
          <Prose>
            {/* TODO(legal): template copy — have counsel review before launch. */}
            <h2>1. About these terms</h2>
            <p>
              These terms govern your use of {siteConfig.url} (the &ldquo;Site&rdquo;), operated by{" "}
              {siteConfig.name}. Any engagement between {siteConfig.name} and a client or contributor
              is governed by a separate written agreement, not by these terms.
            </p>

            <h2>2. Informational content</h2>
            <p>
              Content on the Site describes our services in general terms. It is not an offer, and
              nothing on the Site guarantees availability, pricing, outcomes, or the acceptance of
              any inquiry or application.
            </p>

            <h2>3. Independence and third-party references</h2>
            <p>
              {siteConfig.disclaimerLong} Third-party names and logos are the property of their
              respective owners and are used solely to identify those organizations. Links to
              third-party sites are provided for convenience; we do not control and are not
              responsible for their content or practices.
            </p>

            <h2>4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Submit false, misleading, or unlawful information through our forms.</li>
              <li>Use automated tools to scrape, probe, or overload the Site.</li>
              <li>Attempt to bypass security or spam-protection measures.</li>
              <li>Infringe the intellectual-property rights of {siteConfig.name} or others.</li>
            </ul>

            <h2>5. Submissions</h2>
            <p>
              By submitting an inquiry or application you confirm the information is accurate and
              that you have the right to share it (including any résumé or portfolio material). We
              may contact you about your submission. Our handling of personal information is
              described in our <a href="/privacy">Privacy Policy</a>.
            </p>

            <h2>6. Intellectual property</h2>
            <p>
              The Site&rsquo;s original text, design, graphics, and code are owned by{" "}
              {siteConfig.name} and may not be reproduced without permission, except for personal,
              non-commercial viewing.
            </p>

            <h2>7. Disclaimers and limitation of liability</h2>
            <p>
              The Site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest
              extent permitted by law, {siteConfig.name} will not be liable for any indirect,
              incidental, or consequential damages arising from your use of the Site.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update these terms from time to time. Continued use of the Site after changes
              are posted constitutes acceptance of the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
