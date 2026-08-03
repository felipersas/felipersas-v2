"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps, HTMLAttributes } from "react";
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
        "group flex w-full flex-col gap-2",
        from === "user"
          ? "is-user ml-auto max-w-[94%] items-end"
          : "is-assistant max-w-[70ch] items-start",
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

const PROJECT_PATH = /^\/projects\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const SAFE_EXTERNAL_SCHEME = /^(?:https?:|mailto:)/i;

type ResolvedLink =
  | { href: string; kind: "external" }
  | { href: string; kind: "internal" | "project" }
  | { kind: "unsafe" };

export function resolveLink(
  href: string | undefined,
  locale?: string
): ResolvedLink {
  if (!href) return { kind: "unsafe" };

  if (href.startsWith("/")) {
    if (href.startsWith("//")) return { kind: "unsafe" };

    const path = locale ? `/${locale}${href}` : href;
    return PROJECT_PATH.test(href)
      ? { href: path, kind: "project" }
      : { href: path, kind: "internal" };
  }

  return SAFE_EXTERNAL_SCHEME.test(href)
    ? { href, kind: "external" }
    : { kind: "unsafe" };
}

function MessageLink({
  children,
  href,
  locale,
}: AnchorHTMLAttributes<HTMLAnchorElement> & { locale?: string }) {
  const link = resolveLink(href, locale);

  if (link.kind === "unsafe") return <>{children}</>;

  if (link.kind === "project") {
    return (
      <Link
        className="inline-flex items-baseline gap-1 border border-line px-1.5 py-0.5 font-medium no-underline transition-colors hover:bg-muted/50"
        data-project-link=""
        href={link.href}
      >
        {children}
        <ArrowUpRight aria-hidden className="size-3 shrink-0 self-center" />
      </Link>
    );
  }

  if (link.kind === "internal") {
    return <Link href={link.href}>{children}</Link>;
  }

  return (
    <a href={link.href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}

export interface MessageResponseProps {
  children: string;
  className?: string;
  locale?: string;
}

export const MessageResponse = memo(function MessageResponse({
  children,
  className,
  locale,
}: MessageResponseProps) {
  return (
    <div
      className={cn(
        "space-y-2 break-words [&_a:not([data-project-link])]:link-underline [&_a]:font-medium [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:m-0 [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
        className
      )}
    >
      <ReactMarkdown
        components={{
          a: (props) => <MessageLink {...props} locale={locale} />,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
});
