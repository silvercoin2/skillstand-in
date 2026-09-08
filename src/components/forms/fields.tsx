"use client";

import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optionalLabel?: boolean;
  children: (a11y: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => ReactNode;
  className?: string;
}

/** Label + control + hint/error wiring with correct aria-describedby. */
export function Field({ id, label, error, hint, required, optionalLabel, children, className }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optionalLabel && !required ? (
          <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
        ) : null}
      </Label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })}
      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const controlClass =
  "h-12 rounded-xl border-input bg-card px-4 text-base shadow-none md:text-[0.95rem]";

export function TextInput({ className, ...props }: ComponentProps<typeof Input>) {
  return <Input className={cn(controlClass, className)} {...props} />;
}

export function TextAreaInput({ className, ...props }: ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn("min-h-36 rounded-xl border-input bg-card px-4 py-3 text-base shadow-none md:text-[0.95rem]", className)}
      {...props}
    />
  );
}

/** Native select for reliable FormData submission + mobile UX. */
export function NativeSelect({
  className,
  children,
  placeholder,
  ...props
}: ComponentProps<"select"> & { placeholder?: string }) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClass,
          "w-full appearance-none pr-10 outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "border",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
