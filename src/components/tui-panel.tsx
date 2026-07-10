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
      className={cn("bg-background/85 backdrop-blur-md p-6 scroll-mt-20 rounded-md", className)}
    >
      <h2 className="tui-header text-sm font-bold uppercase tracking-wider text-foreground mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
