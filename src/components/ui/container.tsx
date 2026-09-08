import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-x", className)} {...props} />;
}

export function Section({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("py-20 sm:py-24 lg:py-28", className)}
      {...props}
    />
  );
}
