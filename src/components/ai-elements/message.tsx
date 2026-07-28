"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import type { ComponentProps, HTMLAttributes } from "react";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export function Message({ className, from, ...props }: MessageProps) {
  return (
    <article
      className={cn(
        "group flex w-full max-w-[94%] flex-col gap-2",
        from === "user"
          ? "is-user ml-auto items-end"
          : "is-assistant items-start",
        className
      )}
      {...props}
    />
  );
}

export function MessageContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "min-w-0 max-w-full text-sm leading-relaxed",
        "group-[.is-user]:border-l group-[.is-user]:border-line group-[.is-user]:pl-3.5 group-[.is-user]:py-1",
        className
      )}
      {...props}
    />
  );
}

export function MessageActions({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export type MessageActionProps = ComponentProps<typeof Button> & {
  tooltip: string;
};

export function MessageAction({
  tooltip,
  children,
  ...props
}: MessageActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" type="button" variant="ghost" {...props}>
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export interface MessageResponseProps {
  children: string;
  className?: string;
}

export const MessageResponse = memo(function MessageResponse({
  children,
  className,
}: MessageResponseProps) {
  return (
    <div
      className={cn(
        "space-y-2 break-words [&_a]:link-underline [&_a]:font-medium [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:m-0 [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
});
