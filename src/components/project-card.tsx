import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  links,
  className,
}: Props) {
  return (
    <div className={cn("group", className)}>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-accent shrink-0" aria-hidden>›</span>
          <h3 className="font-semibold group-hover:text-accent transition-colors truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <time className="text-xs text-muted-foreground tabular-nums">{dates}</time>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="text-xs prose prose-sm max-w-full text-pretty leading-relaxed text-muted-foreground dark:prose-invert pl-5">
        <Markdown>{description}</Markdown>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 pl-5 text-[11px] text-muted-foreground">
        {links?.map((link, idx) => (
          <Link
            href={link.href}
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <span className="text-accent">[{link.type.toLowerCase()}]</span>
            {link.icon && <span className="size-3 inline-flex">{link.icon}</span>}
          </Link>
        ))}
        {tags?.map((tag) => (
          <span key={tag}>
            <span className="text-accent">[</span>
            {tag}
            <span className="text-accent">]</span>
          </span>
        ))}
      </div>
    </div>
  );
}
