"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
    >
      <SunIcon className="size-4.5 sm:size-5 block dark:hidden" />
      <MoonIcon className="size-4.5 sm:size-5 hidden dark:block" />
    </button>
  );
}
