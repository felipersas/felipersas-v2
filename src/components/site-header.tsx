"use client";

import { DATA } from "@/data/resume";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileDown,
  Languages,
  Moon,
  MoreHorizontal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const ITEM_CLASS =
  "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-none";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function SiteHeader() {
  const { locale, setLocale, t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Subscribing beats an effect here: no cascading render, and the server
  // snapshot is simply "not scrolled".
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false
  );

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "pt-BR" : "en";
    setLocale(nextLocale);
    setMenuOpen(false);

    const nextPathname = pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${nextLocale}`)
      : `/${nextLocale}${pathname === "/" ? "" : pathname}`;

    router.push(nextPathname);
  };

  const isDark = resolvedTheme === "dark";
  const resumeHref = locale === "en" ? "/resume_en.pdf" : "/curriculo.pdf";
  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar
  );

  return (
    <header
      aria-label={t("navbar.navigation")}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm transition-colors duration-200",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-12 max-w-2xl items-center justify-between gap-2 px-6">
        <Link
          className="rounded-sm text-sm font-semibold tracking-tight transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href={`/${locale}`}
        >
          {DATA.name}
        </Link>

        <div className="flex items-center gap-0.5">
          <a
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            download
            href={resumeHref}
          >
            <FileDown className="size-4" aria-hidden />
            {t("navbar.resume")}
          </a>

          <div className="relative" ref={menuRef}>
            <button
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={t("navbar.menu")}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <MoreHorizontal className="size-4.5" aria-hidden />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full z-10 mt-2 flex w-52 flex-col gap-px rounded-lg border border-border bg-popover p-1 shadow-lg"
                role="menu"
              >
                <Link
                  className={ITEM_CLASS}
                  href={`/${locale}/reading`}
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <BookOpen className="size-4" aria-hidden />
                  {t("navbar.reading")}
                </Link>

                <hr className="my-1 border-line" />

                <button
                  className={ITEM_CLASS}
                  onClick={toggleLocale}
                  role="menuitem"
                  type="button"
                >
                  <Languages className="size-4" aria-hidden />
                  {locale === "en" ? "Português" : "English"}
                </button>

                {/* Safe to read the resolved theme directly: the menu only
                    exists after a click, so it never takes part in hydration. */}
                <button
                  className={ITEM_CLASS}
                  onClick={() => {
                    setTheme(isDark ? "light" : "dark");
                    setMenuOpen(false);
                  }}
                  role="menuitem"
                  type="button"
                >
                  {isDark ? (
                    <Sun className="size-4" aria-hidden />
                  ) : (
                    <Moon className="size-4" aria-hidden />
                  )}
                  {isDark ? t("navbar.themeLight") : t("navbar.themeDark")}
                </button>

                <hr className="my-1 border-line" />

                {socials.map(([name, social]) => {
                  const Icon = social.icon;
                  return (
                    <a
                      className={ITEM_CLASS}
                      href={social.url}
                      key={name}
                      onClick={() => setMenuOpen(false)}
                      rel="noopener noreferrer"
                      role="menuitem"
                      target="_blank"
                    >
                      <Icon className="size-4" aria-hidden />
                      {name}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
