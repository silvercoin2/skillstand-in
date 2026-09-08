"use client";

import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ButtonArrow } from "@/components/ui/arrow-link";
import { siteConfig } from "@/config/site";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function SuccessPanel({
  title,
  message,
  onReset,
  resetLabel = "Send another message",
}: {
  title: string;
  message: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-5 rounded-3xl border border-brand/40 bg-accent/50 px-6 py-14 text-center animate-in fade-in zoom-in-95 duration-400 dark:bg-accent/30"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <CheckCircle2Icon className="size-7" aria-hidden="true" />
      </span>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="max-w-md text-muted-foreground">{message}</p>
      <Button type="button" variant="outline" size="lg" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
    >
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>
        {message}{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold underline underline-offset-4">
          {siteConfig.contactEmail}
        </a>
      </p>
    </div>
  );
}

export function SubmitButton({
  status,
  children,
  pendingLabel = "Sending…",
  disabled,
}: {
  status: FormStatus;
  children: ReactNode;
  pendingLabel?: string;
  disabled?: boolean;
}) {
  const pending = status === "submitting";
  return (
    <Button type="submit" size="xl" disabled={pending || disabled} aria-busy={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2Icon className="animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        <>
          {children}
          <ButtonArrow />
        </>
      )}
    </Button>
  );
}

/** Hidden honeypot field; visually removed and excluded from the a11y tree. */
export function Honeypot({ register }: { register: object }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="website-field">Website</label>
      <input id="website-field" type="text" tabIndex={-1} autoComplete="off" {...register} />
    </div>
  );
}
