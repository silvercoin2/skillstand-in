import type { Metadata } from "next";

import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Prose } from "@/components/ui/prose";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, accesses, uses, protects, and discloses personal information in connection with our services and work involving third-party platforms.`,
  path: "/privacy",
});

const LAST_UPDATED = "September 11, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Effective ${LAST_UPDATED}. This policy explains how we collect, access, use, protect, and disclose personal information.`}
      />
      <Section>
        <Container>
          <Prose>
            <p>
              Skill Stand In LLC (&ldquo;Skill Stand In,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) respects the privacy and security of candidates, contractors,
              account managers, and other individuals who work with us.
            </p>
            <p>
              This Privacy Policy explains how we collect, access, use, protect, and disclose
              personal information in connection with our services and work involving third-party
              platforms.
            </p>

            <h2>1. Information We May Access or Collect</h2>
            <p>
              Depending on the services you participate in, Skill Stand In may receive or access
              information such as:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Resume and professional information</li>
              <li>Platform account information</li>
              <li>Application and onboarding information</li>
              <li>Work-related communications</li>
              <li>Payment-related information necessary to administer compensation</li>
              <li>Information you voluntarily provide to our team</li>
            </ul>
            <p>
              In some cases, a third-party platform account may be connected to your personal email
              address. We recognize that this may provide access to information unrelated to our
              work and apply the restrictions described below.
            </p>

            <h2>2. Account Access</h2>
            <p>
              When you authorize Skill Stand In to access an account, access will be limited to
              authorized team members who require it to perform agreed-upon work.
            </p>
            <p>
              We will not intentionally access, review, copy, or use private personal emails,
              files, contacts, photographs, or other personal information unrelated to the services
              we are performing.
            </p>
            <p>
              Account access will be used only for authorized business purposes, such as managing
              agreed-upon platform activity, completing assigned tasks, or supporting your
              participation on a platform.
            </p>

            <h2>3. Limited Team Access</h2>
            <p>
              Access to your accounts or information will be limited to team members who reasonably
              need that access to perform their responsibilities.
            </p>
            <p>
              Skill Stand In will not intentionally share account credentials or personal
              information with unrelated individuals or third parties unless you authorize it, it is
              necessary to provide the agreed service, or disclosure is required by law.
            </p>
            <p>
              Team members with access are expected to maintain the confidentiality of account
              credentials and personal information.
            </p>

            <h2>4. Use of Personal Information</h2>
            <p>We may use information provided to us to:</p>
            <ul>
              <li>Evaluate and manage applications</li>
              <li>Communicate about opportunities</li>
              <li>Assist with authorized platform activities</li>
              <li>Coordinate tasks and assignments</li>
              <li>Administer contractor relationships and payments</li>
              <li>Provide technical or account support</li>
              <li>Maintain security and prevent unauthorized activity</li>
              <li>Meet applicable legal or administrative requirements</li>
            </ul>
            <p>
              We will not use your personal email address or personal information to create or
              register accounts on additional platforms without your knowledge and consent.
            </p>

            <h2>5. Personal Email Privacy</h2>
            <p>
              If access to a platform requires access through your personal email account, Skill
              Stand In will use that access only as necessary for the authorized platform-related
              purpose.
            </p>
            <p>
              We will not intentionally search through or review personal conversations or
              unrelated email content.
            </p>
            <p>
              We will not send personal emails, modify unrelated account settings, delete personal
              information, or otherwise use your personal email account for purposes unrelated to
              the authorized work.
            </p>

            <h2>6. Account Security</h2>
            <p>We encourage all participants to enable two-factor authentication (2FA) whenever supported.</p>
            <p>
              Where practical, individuals should use platform-specific access, delegated access,
              separate work accounts, or other limited-access methods instead of sharing primary
              personal account credentials.
            </p>
            <p>
              Authorized team members must take reasonable precautions to prevent credentials and
              personal information from being exposed to unauthorized persons.
            </p>
            <p>
              If we become aware of suspected unauthorized access involving information under our
              control, we will take reasonable steps to investigate, secure affected access, and
              notify affected individuals when appropriate or legally required.
            </p>

            <h2>7. Third-Party Platforms</h2>
            <p>
              Skill Stand In may assist individuals with independent third-party platforms. Those
              platforms maintain their own privacy policies, security practices, account
              requirements, and terms of service.
            </p>
            <p>
              Skill Stand In does not control how those third-party platforms collect, process,
              store, or protect information.
            </p>
            <p>
              Participants should review the applicable platform&rsquo;s privacy policy and terms
              before providing personal information or granting account access.
            </p>

            <h2>8. Sharing of Information</h2>
            <p>We do not sell personal information.</p>
            <p>
              We may share information with authorized Skill Stand In personnel or service
              providers when reasonably necessary to provide our services, administer our
              operations, protect accounts, or comply with applicable law.
            </p>
            <p>
              We will seek consent before using personal information for materially different
              purposes unless otherwise permitted or required by law.
            </p>

            <h2>9. Data Retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the
              purposes for which it was collected, our legitimate business and recordkeeping
              requirements, dispute resolution, security, and applicable legal obligations.
            </p>
            <p>
              When information is no longer reasonably required, we may delete, anonymize, or
              securely dispose of it as appropriate.
            </p>

            <h2>10. Your Choices</h2>
            <p>You may contact Skill Stand In to:</p>
            <ul>
              <li>Ask what personal information we maintain about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Raise concerns about how your information is being handled</li>
              <li>Request that account access be discontinued</li>
              <li>
                Request deletion of information, subject to applicable legal, contractual,
                security, and recordkeeping requirements
              </li>
            </ul>
            <p>
              Revoking access may prevent Skill Stand In from continuing services that depend on
              that access.
            </p>

            <h2>11. Your Responsibility for Account Security</h2>
            <p>
              Participants should use strong, unique passwords and enable two-factor authentication
              where available.
            </p>
            <p>
              If you believe an account shared with Skill Stand In has been compromised, you should
              change the relevant credentials promptly and notify us so that appropriate access can
              be reviewed.
            </p>

            <h2>12. Changes to This Policy</h2>
            <p>
              Skill Stand In may update this Privacy Policy as its services, security practices, or
              legal requirements change.
            </p>
            <p>
              Material changes may be communicated through our website, email, or another
              appropriate communication channel.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              Questions or concerns regarding privacy, account access, or personal information may
              be directed to:
            </p>
            <p>
              <strong>Skill Stand In LLC</strong>
              <br />
              Website:{" "}
              <a href={siteConfig.url}>{siteConfig.url.replace(/^https?:\/\//, "")}</a>
              <br />
              Email:{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </p>
            <p>© {siteConfig.foundedYear} Skill Stand In LLC. All rights reserved.</p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
