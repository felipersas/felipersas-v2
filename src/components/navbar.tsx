"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-2 px-4 sm:px-6">
        <div className="flex items-center gap-0.5 sm:gap-1">
          {DATA.navbar.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                aria-label={typeof item.label === 'string' ? item.label : item.label[locale] || item.label['en']}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex size-8 sm:size-9 items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                <item.icon className="size-4.5 sm:size-5" aria-hidden="true" />
              </a>
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
    </div>
  );
}
