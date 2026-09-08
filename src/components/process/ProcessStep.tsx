import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  isLast = false,
  orientation = "horizontal",
  className,
}: ProcessStepProps) {
  return (
    <li className={cn("relative flex gap-5", orientation === "horizontal" && "lg:flex-col lg:gap-6", className)}>
      {/* Connector */}
      {!isLast ? (
        <span
          aria-hidden="true"
          data-connector=""
          className={cn(
            "absolute top-12 left-6 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-brand-strong/60 to-border",
            orientation === "horizontal" &&
              "lg:top-6 lg:left-14 lg:h-px lg:w-[calc(100%-2.5rem)] lg:bg-gradient-to-r",
          )}
        />
      ) : null}
      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-brand/60 bg-card font-mono text-sm font-bold text-brand-deep shadow-soft">
        {number}
      </span>
      <div className="flex flex-col gap-2 pb-10 lg:pb-0">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
