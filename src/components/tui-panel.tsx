import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TuiPanelProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function TuiPanel({ id, title, children, className }: TuiPanelProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative border border-border bg-background/90 backdrop-blur-sm p-6 pt-7 scroll-mt-20",
        className
      )}
    >
      <h2 className="absolute -top-2.5 left-4 bg-background px-2 font-mono text-sm font-bold tracking-wide flex items-center gap-1.5">
        <span className="text-foreground uppercase tracking-wider">{title}</span>
      </h2>
      {children}
    </section>
  );
}
