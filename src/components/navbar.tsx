"use client"
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA, localize } from "@/data/resume";
import { useTranslation } from "@/hooks/use-translation";
import { FileDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { locale, setLocale, t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'pt-BR' : 'en'
    setLocale(newLocale)
    
    let newPathname = pathname
    if (pathname.startsWith(`/${locale}`)) {
      newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    } else {
      newPathname = `/${newLocale}${pathname === '/' ? '' : pathname}`
    }
    
    router.push(newPathname)
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-1 w-fit mx-auto flex gap-1 border bg-background/95 backdrop-blur-sm font-mono">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  aria-label={typeof item.label === 'string' ? item.label : item.label[locale] || item.label['en']}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-none cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-accent hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" aria-hidden="true" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-sm bg-accent text-accent-foreground px-3 py-1.5 text-xs font-mono shadow-none"
              >
                <p>{localize(item.label, locale)}</p>
                <TooltipArrow className="fill-accent" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-muted-foreground/30"
        />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={name}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className="rounded-none cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-accent hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" aria-hidden="true" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-sm bg-accent text-accent-foreground px-3 py-1.5 text-xs font-mono shadow-none"
                >
                  <p>{name}</p>
                  <TooltipArrow className="fill-accent" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-muted-foreground/30"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={locale === 'en' ? '/resume_en.pdf' : '/curriculo.pdf'}
              aria-label={t('navbar.resume')}
              download
            >
              <DockIcon className="rounded-none cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-accent hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                <FileDown className="size-5" aria-hidden="true" />
              </DockIcon>
            </a>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>{t('navbar.resume')}</p>
            <TooltipArrow className="fill-accent" />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleLocale}
              aria-label={locale === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <DockIcon className="rounded-none cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-accent hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
                <Languages className="size-5" aria-hidden="true" />
              </DockIcon>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>{locale === 'en' ? 'Portugues' : 'English'}</p>
            <TooltipArrow className="fill-accent" />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-none cursor-pointer size-full bg-transparent p-0 text-muted-foreground hover:text-accent hover:bg-muted/50 border border-transparent hover:border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>{t('navbar.theme')}</p>
            <TooltipArrow className="fill-accent" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
