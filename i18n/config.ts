/**
 * i18n Configuration
 */

export const locales = ['en', 'pt-BR'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'pt-BR': 'Português'
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const locale = locales.find(l => pathname.startsWith(`/${l}`))
  return (locale || defaultLocale) as Locale
}

/**
 * Remove locale from pathname
 */
export function stripLocale(pathname: string): string {
  const localePattern = new RegExp(`^/(${locales.join('|')})`)
  return pathname.replace(localePattern, '') || '/'
}

/**
 * Check if pathname is localized
 */
export function isLocalizedPathname(pathname: string): boolean {
  return locales.some(l => pathname.startsWith(`/${l}`))
}
