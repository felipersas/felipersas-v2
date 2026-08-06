"use client";

import { useTranslation } from "@/hooks/use-translation";
import { CornerDownLeft, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

/** Mirrors the ceiling the agent route applies to `?prompt=`. */
const MAX_PROMPT_LENGTH = 1_200;

export function AskDock() {
  const { locale, t } = useTranslation();
  const pathname = usePathname();

  // No point inviting someone into a conversation they are already having.
  if (/\/agent\/?$/.test(pathname)) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background from-55% to-transparent px-6 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-8">
      {/* A real GET form: whatever is typed here arrives as ?prompt= and the
          agent opens already answering it. Works without JavaScript. */}
      <form
        action={`/${locale}/agent`}
        className="pointer-events-auto mx-auto flex h-11 max-w-2xl items-center gap-2 rounded-full border border-border bg-card/90 pr-1.5 pl-4 backdrop-blur-md transition-colors focus-within:border-foreground/40"
        method="get"
      >
        <Sparkles className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />

        <input
          aria-label={t("ask.label")}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          maxLength={MAX_PROMPT_LENGTH}
          name="prompt"
          placeholder={t("ask.placeholder")}
          type="text"
        />

        <button
          aria-label={t("ask.submit")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          type="submit"
        >
          <CornerDownLeft className="size-3.5" aria-hidden />
        </button>
      </form>
    </div>
  );
}
