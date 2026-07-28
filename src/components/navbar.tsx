"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
import { useTranslation } from "@/hooks/use-translation";
import {
  getPortfolioMode,
  getPortfolioModeHref,
  type PortfolioMode,
} from "@/lib/portfolio-mode";
import { Bot, FileDown, Languages, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { locale, setLocale, t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const activeMode = getPortfolioMode(pathname)
  const modes: Array<{
    icon: typeof PanelsTopLeft;
    label: string;
    mode: PortfolioMode;
  }> = [
    {
      icon: PanelsTopLeft,
      label: t("navbar.portfolioMode"),
      mode: "portfolio",
    },
    {
      icon: Bot,
      label: t("navbar.agentMode"),
      mode: "agent",
    },
  ]

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
    <nav
      aria-label={t("navbar.navigation")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-2 pl-14 pr-4 sm:px-6">
        <div
          aria-label={t("navbar.modeSelector")}
          className="flex items-center gap-0.5"
          role="group"
        >
          {modes.map(({ icon: Icon, label, mode }) => {
            const isActive = activeMode === mode

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
                className={`relative flex size-8 items-center justify-center gap-1.5 rounded-md font-mono text-[10px] font-medium uppercase tracking-wide transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:h-8 sm:w-auto sm:px-2.5 ${
                  isActive
                    ? "bg-accent text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                href={getPortfolioModeHref(locale, mode)}
                key={mode}
                title={label}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => {
              const isExternal = social.url.startsWith("http");
              const IconComponent = social.icon;
              return (
                <a
                  key={name}
                  href={social.url}
                  aria-label={name}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                >
                  <IconComponent className="size-4.5 sm:size-5" aria-hidden="true" />
                </a>
              );
            })}

          <span className="mx-0.5 sm:mx-1 h-5 w-px bg-line shrink-0" aria-hidden />

          <a
            href={locale === 'en' ? '/resume_en.pdf' : '/curriculo.pdf'}
            aria-label={t('navbar.resume')}
            download
            className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
          >
            <FileDown className="size-4.5 sm:size-5" aria-hidden="true" />
          </a>

          <button
            onClick={toggleLocale}
            aria-label={locale === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
          >
            <Languages className="size-4.5 sm:size-5" aria-hidden="true" />
          </button>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
