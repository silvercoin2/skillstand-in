import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Long-form typography for legal/marketing copy without the Tailwind typography plugin. */
export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-3xl text-[1.02rem] leading-relaxed text-foreground/90",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:tracking-tight",
        "[&_p]:mb-4 [&_p]:text-muted-foreground",
        "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ul]:text-muted-foreground",
        "[&_a]:font-medium [&_a]:text-brand-deep [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
