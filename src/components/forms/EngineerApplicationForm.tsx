"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { PaperclipIcon } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { submitEngineerApplication } from "@/app/contact/actions";
import { experienceRanges } from "@/data/content";
import { track } from "@/lib/analytics";
import {
  RESUME_ACCEPT,
  engineerApplicationSchema,
  isAllowedResume,
  type EngineerApplicationInput,
} from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

import { Field, NativeSelect, TextAreaInput, TextInput, controlClass } from "./fields";
import { ErrorBanner, Honeypot, SubmitButton, SuccessPanel, type FormStatus } from "./FormShell";
import { TurnstileField, turnstileEnabledOnClient } from "./TurnstileField";

export function EngineerApplicationForm() {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<EngineerApplicationInput>({
    resolver: zodResolver(engineerApplicationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      location: "",
      skills: "",
      experience: undefined,
      linkedin: "",
      github: "",
      resumeLink: "",
      message: "",
      website: "",
    },
  });

  const resumeLinkField = register("resumeLink");

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("engineer_form_started");
  }

  function onFileChange() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setResumeName(null);
      setResumeError(null);
      return;
    }
    const check = isAllowedResume(file);
    if (!check.ok) {
      setResumeError(check.error);
      setResumeName(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setResumeError(null);
    setResumeName(file.name);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    await handleSubmit(async () => {
      const formData = new FormData(form);
      const resumeEntry = formData.get("resume");
      const hasFile = resumeEntry instanceof File && resumeEntry.size > 0;
      if (!hasFile && !getValues("resumeLink")) {
        setResumeError("Attach a résumé (PDF/Word) or add a link to one.");
        return;
      }
      setStatus("submitting");
      setServerError(null);
      const result = await submitEngineerApplication(formData);

      if (result.ok) {
        setStatus("success");
        track("engineer_form_submitted");
        return;
      }

      setStatus("error");
      setServerError(result.error);
      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (!messages?.[0]) continue;
          if (field === "resume") setResumeError(messages[0]);
          else setError(field as keyof EngineerApplicationInput, { type: "server", message: messages[0] });
        }
      }
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    })(event);
  }

  if (status === "success") {
    return (
      <SuccessPanel
        title="Application received — thank you."
        message="We review every application ourselves. If your background fits an upcoming project, we'll reach out with details."
        onReset={() => {
          reset();
          setResumeName(null);
          setResumeError(null);
          startedRef.current = false;
          setStatus("idle");
        }}
        resetLabel="Submit another application"
      />
    );
  }

  const submitDisabled = turnstileEnabledOnClient && !turnstileToken;

  return (
    <form
      onSubmit={onSubmit}
      onChange={markStarted}
      noValidate
      encType="multipart/form-data"
      className="relative flex flex-col gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ea-name" label="Full name" required error={errors.name?.message}>
          {(a11y) => <TextInput {...a11y} {...register("name")} autoComplete="name" />}
        </Field>
        <Field id="ea-email" label="Email" required error={errors.email?.message}>
          {(a11y) => <TextInput {...a11y} {...register("email")} type="email" autoComplete="email" inputMode="email" />}
        </Field>
        <Field id="ea-location" label="Location" required hint="City and country, or time zone." error={errors.location?.message}>
          {(a11y) => <TextInput {...a11y} {...register("location")} autoComplete="country-name" />}
        </Field>
        <Field id="ea-experience" label="Years of experience" required error={errors.experience?.message}>
          {(a11y) => (
            <NativeSelect {...a11y} {...register("experience")} placeholder="Select a range">
              {experienceRanges.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      </div>

      <Field
        id="ea-skills"
        label="Primary skills"
        required
        hint="Languages, frameworks, cloud, AI/ML — whatever you are strongest in."
        error={errors.skills?.message}
      >
        {(a11y) => <TextInput {...a11y} {...register("skills")} placeholder="e.g. TypeScript, React, Python, AWS, LLM evaluation" />}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ea-linkedin" label="LinkedIn or portfolio" optionalLabel error={errors.linkedin?.message}>
          {(a11y) => <TextInput {...a11y} {...register("linkedin")} type="url" inputMode="url" placeholder="https://" />}
        </Field>
        <Field id="ea-github" label="GitHub" optionalLabel error={errors.github?.message}>
          {(a11y) => <TextInput {...a11y} {...register("github")} type="url" inputMode="url" placeholder="https://github.com/" />}
        </Field>
      </div>

      <fieldset className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-5">
        <legend className="px-1 text-sm font-semibold">Résumé</legend>
        <p className="-mt-2 text-xs text-muted-foreground">Upload a PDF or Word file (max 4 MB), or paste a link. One of the two is required.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="ea-resume" className="text-sm font-semibold">
              Upload file
            </label>
            <div className="relative">
              <input
                ref={fileRef}
                id="ea-resume"
                name="resume"
                type="file"
                accept={RESUME_ACCEPT}
                onChange={onFileChange}
                aria-invalid={resumeError ? true : undefined}
                aria-describedby={resumeError ? "ea-resume-error" : "ea-resume-hint"}
                className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
              />
              <div
                aria-hidden="true"
                className={cn(
                  controlClass,
                  "flex items-center gap-2 border text-muted-foreground peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                  resumeName && "text-foreground",
                )}
              >
                <PaperclipIcon className="size-4 shrink-0" />
                <span className="truncate">{resumeName ?? "Choose a file…"}</span>
              </div>
            </div>
            <p id="ea-resume-hint" className="sr-only">
              PDF or Word document, 4 MB maximum.
            </p>
          </div>
          <Field id="ea-resumeLink" label="Or link to résumé" error={errors.resumeLink?.message}>
            {(a11y) => (
              <TextInput
                {...a11y}
                {...resumeLinkField}
                type="url"
                inputMode="url"
                placeholder="https://"
                onChange={(e) => {
                  void resumeLinkField.onChange(e);
                  setResumeError(null);
                }}
              />
            )}
          </Field>
        </div>
        {resumeError ? (
          <p id="ea-resume-error" role="alert" className="text-xs font-medium text-destructive">
            {resumeError}
          </p>
        ) : null}
      </fieldset>

      <Field id="ea-message" label="Message" optionalLabel hint="Anything else we should know — availability, interests, notable work." error={errors.message?.message}>
        {(a11y) => <TextAreaInput {...a11y} {...register("message")} rows={5} className="min-h-28" />}
      </Field>

      <Honeypot register={register("website")} />

      <TurnstileField ref={turnstileRef} onToken={setTurnstileToken} />

      {serverError ? <ErrorBanner message={serverError} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton status={status} disabled={submitDisabled} pendingLabel="Submitting…">
          Submit application
        </SubmitButton>
        <p className="text-xs text-muted-foreground">
          Your details are used only to evaluate your application. See our{" "}
          <a href="/privacy" className="font-medium underline underline-offset-4">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
