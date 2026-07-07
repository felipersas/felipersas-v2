"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ponytail: clipboard pode falhar em contextos não seguros — silencioso
    }
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy email"
      className="text-accent hover:text-foreground transition-colors text-xs ml-1"
    >
      [{copied ? "copied" : "copy"}]
    </button>
  );
}
