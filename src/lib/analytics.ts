import { track as vercelTrack } from "@vercel/analytics";

/**
 * Conversion-focused analytics events (PRD §33).
 * Provider is Vercel Analytics; swap the implementation of `track` to move
 * to PostHog/Plausible without touching call sites.
 */
export type AnalyticsEvent =
  | "company_cta_clicked"
  | "engineer_cta_clicked"
  | "company_form_started"
  | "company_form_submitted"
  | "engineer_form_started"
  | "engineer_form_submitted"
  | "platform_clicked"
  | "how_it_works_clicked"
  | "careers_cta_clicked"
  | "career_apply_clicked"
  | "theme_changed";

type Primitive = string | number | boolean | null;

export interface AnalyticsProps {
  [key: string]: Primitive | undefined;
}

export interface PlatformClickedProps extends AnalyticsProps {
  platform_name: string;
  platform_category: string;
  source_page: string;
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  try {
    const clean: Record<string, Primitive> = {};
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v !== undefined) clean[k] = v;
      }
    }
    vercelTrack(event, clean);
  } catch {
    // Analytics must never break the UI.
  }
}

export function currentPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}
