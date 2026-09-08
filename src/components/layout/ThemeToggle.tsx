"use client";

import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { track } from "@/lib/analytics";

type Theme = "system" | "light" | "dark";

const OPTIONS: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
];

const subscribeNoop = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // Avoid hydration mismatch: render a neutral icon until mounted.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const current = (theme as Theme | undefined) ?? "system";
  const ResolvedIcon =
    !mounted ? MonitorIcon : resolvedTheme === "dark" ? MoonIcon : SunIcon;

  function onSelect(next: Theme) {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 320);
    }
    setTheme(next);
    track("theme_changed", { theme: next });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-touch"
          className={className}
          aria-label={`Change theme (current: ${mounted ? current : "system"})`}
        >
          <ResolvedIcon className="size-[18px]" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {OPTIONS.map(({ value, label, Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => onSelect(value)}
            aria-current={mounted && current === value ? "true" : undefined}
            className={
              mounted && current === value
                ? "bg-accent text-accent-foreground"
                : undefined
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
