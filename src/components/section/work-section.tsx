"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA, localize } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <div className="size-8 md:size-10 flex-none relative">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 32px, 40px"
        className="p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function WorkSection() {
  const { locale } = useTranslation()
  return (
    <Accordion type="multiple" className="w-full grid gap-5">
      {DATA.work.map((work) => {
        const hasBullets = work.bullets.length > 0;

        return (
          <AccordionItem
            key={work.company}
            value={work.company}
            className="w-full border-b-0 grid gap-2"
          >
          <AccordionTrigger
            disabled={!hasBullets}
            className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group disabled:cursor-default [&>svg]:hidden"
          >
            <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] gap-x-3 text-left sm:flex sm:items-center sm:justify-between">
              <LogoImage src={work.logoUrl} alt={work.company} />
              <div className="min-w-0 sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-tight flex items-start gap-2">
                    <span className="min-w-0 break-words">{work.company}</span>
                    {hasBullets && (
                      <span className="relative mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center">
                        <ChevronRight
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                            "translate-x-0 opacity-100",
                            "group-hover:translate-x-1",
                            "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                            "opacity-0 rotate-0",
                            "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                          )}
                        />
                      </span>
                    )}
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {localize(work.title, locale)}
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs tabular-nums text-muted-foreground sm:mt-0 sm:flex-none sm:text-right">
                  <span>
                    {localize(work.start, locale)} - {localize(work.end, locale)}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          {hasBullets && (
            <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
              <ul className="space-y-1.5">
                {work.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent shrink-0" aria-hidden>▸</span>
                    <span>{localize(bullet, locale)}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
        );
      })}
    </Accordion>
  );
}
