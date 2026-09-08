"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { forwardRef } from "react";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

interface TurnstileFieldProps {
  onToken: (token: string | null) => void;
  onError?: () => void;
}

/**
 * Cloudflare Turnstile widget. Injects a hidden `cf-turnstile-response` input
 * into the surrounding form so the token travels with the FormData. Renders
 * nothing when no site key is configured (local dev).
 */
export const TurnstileField = forwardRef<TurnstileInstance, TurnstileFieldProps>(function TurnstileField(
  { onToken, onError },
  ref,
) {
  const { resolvedTheme } = useTheme();
  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <div className="flex flex-col gap-2">
      <Turnstile
        ref={ref}
        siteKey={TURNSTILE_SITE_KEY}
        onSuccess={(token) => onToken(token)}
        onExpire={() => onToken(null)}
        onError={() => {
          onToken(null);
          onError?.();
        }}
        options={{
          theme: resolvedTheme === "dark" ? "dark" : "light",
          size: "flexible",
          appearance: "always",
        }}
      />
      <p className="text-xs text-muted-foreground">
        Protected by Cloudflare Turnstile. No cookies, no puzzles.
      </p>
    </div>
  );
});

export const turnstileEnabledOnClient = Boolean(TURNSTILE_SITE_KEY);
