import React from "react"
import { cn } from "@/lib/utils"

function Tag({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80",
        className
      )}
      {...props}
    />
  )
}

export { Tag }
