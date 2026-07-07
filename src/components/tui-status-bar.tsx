"use client";

import { useEffect, useState } from "react";

export function TuiStatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur font-mono text-[11px] text-muted-foreground hidden md:flex">
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between px-6 py-1">
        <div className="flex items-center gap-3">
          <span className="text-accent">NORMAL</span>
          <span aria-hidden>·</span>
          <span>UTF-8</span>
          <span aria-hidden>·</span>
          <span>ln 1:1</span>
        </div>
        <div className="flex items-center gap-3">
          <span>portfolio.tsx</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  );
}
