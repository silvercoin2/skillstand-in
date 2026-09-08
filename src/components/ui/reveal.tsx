"use client";

import {
  useEffect,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  delay?: number;
  once?: boolean;
} & Omit<ComponentProps<T>, "as">;

/**
 * Section reveal driven by IntersectionObserver + CSS (see [data-reveal] in
 * globals.css). Reduced-motion users get content immediately via CSS, and
 * anyone without IO support gets it via the fallback below.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "visible";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "visible";
            if (once) io.unobserve(el);
          } else if (!once) {
            el.dataset.reveal = "";
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
