"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { submitCompanyInquiry } from "@/app/contact/actions";
import { budgetRanges, projectTypes, teamSizes, timelines } from "@/data/content";
import { track } from "@/lib/analytics";
import { companyInquirySchema, type CompanyInquiryInput } from "@/lib/validation/contact";

import { Field, NativeSelect, TextAreaInput, TextInput } from "./fields";
import { ErrorBanner, Honeypot, SubmitButton, SuccessPanel, type FormStatus } from "./FormShell";
import { TurnstileField, turnstileEnabledOnClient } from "./TurnstileField";

export function CompanyInquiryForm() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CompanyInquiryInput>({
    resolver: zodResolver(companyInquirySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      projectType: undefined,
      teamSize: "",
      timeline: "",
      budget: "",
      description: "",
      website: "",
    },
  });

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("company_form_started");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    await handleSubmit(async () => {
      setStatus("submitting");
      setServerError(null);
      const formData = new FormData(form);
      const result = await submitCompanyInquiry(formData);

      if (result.ok) {
        setStatus("success");
        track("company_form_submitted");
        return;
      }

      setStatus("error");
      setServerError(result.error);
      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof CompanyInquiryInput, { type: "server", message: messages[0] });
          }
        }
      }
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    })(event);
  }

  if (status === "success") {
    return (
      <SuccessPanel
        title="Thanks — we've received your inquiry."
        message="We'll review your project and get back to you at the email you provided, typically within two business days."
        onReset={() => {
          reset();
          startedRef.current = false;
          setStatus("idle");
        }}
        resetLabel="Send another inquiry"
      />
    );
  }

  const submitDisabled = turnstileEnabledOnClient && !turnstileToken;

  return (
    <form
      onSubmit={onSubmit}
      onChange={markStarted}
      noValidate
      className="relative flex flex-col gap-6"
      aria-describedby={serverError ? "company-form-error" : undefined}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ci-name" label="Full name" required error={errors.name?.message}>
          {(a11y) => <TextInput {...a11y} {...register("name")} autoComplete="name" />}
        </Field>
        <Field id="ci-email" label="Work email" required error={errors.email?.message}>
          {(a11y) => <TextInput {...a11y} {...register("email")} type="email" autoComplete="email" inputMode="email" />}
        </Field>
        <Field id="ci-company" label="Company" required error={errors.company?.message}>
          {(a11y) => <TextInput {...a11y} {...register("company")} autoComplete="organization" />}
        </Field>
        <Field id="ci-role" label="Your role" optionalLabel error={errors.role?.message}>
          {(a11y) => <TextInput {...a11y} {...register("role")} autoComplete="organization-title" />}
        </Field>
        <Field id="ci-projectType" label="Project type" required error={errors.projectType?.message}>
          {(a11y) => (
            <NativeSelect {...a11y} {...register("projectType")} placeholder="Select a project type">
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field id="ci-teamSize" label="Team size needed" optionalLabel error={errors.teamSize?.message}>
          {(a11y) => (
            <NativeSelect {...a11y} {...register("teamSize")} placeholder="Select a range">
              {teamSizes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field id="ci-timeline" label="Timeline" optionalLabel error={errors.timeline?.message}>
          {(a11y) => (
            <NativeSelect {...a11y} {...register("timeline")} placeholder="Select a timeline">
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field id="ci-budget" label="Budget range" optionalLabel error={errors.budget?.message}>
          {(a11y) => (
            <NativeSelect {...a11y} {...register("budget")} placeholder="Select a range">
              {budgetRanges.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      </div>

      <Field
        id="ci-description"
        label="Project description"
        required
        hint="What the work involves, the technical domain, expected outputs, and how quality will be judged."
        error={errors.description?.message}
      >
        {(a11y) => <TextAreaInput {...a11y} {...register("description")} rows={6} />}
      </Field>

      <Honeypot register={register("website")} />

      <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} />

      {serverError ? (
        <div id="company-form-error">
          <ErrorBanner message={serverError} />
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton status={status} disabled={submitDisabled}>
          Send inquiry
        </SubmitButton>
        <p className="text-xs text-muted-foreground">
          We only use this to respond to you. See our{" "}
          <a href="/privacy" className="font-medium underline underline-offset-4">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
