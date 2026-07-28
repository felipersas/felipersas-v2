"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
    >
      <SunIcon className="size-4.5 sm:size-5 block dark:hidden" />
      <MoonIcon className="size-4.5 sm:size-5 hidden dark:block" />
    </button>
  );
}
