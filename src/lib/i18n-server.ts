import en from '@/i18n/locales/en.json'
import ptBR from '@/i18n/locales/pt-BR.json'
import { Locale } from '@/hooks/use-translation'

const translations: Record<Locale, typeof en> = { en, 'pt-BR': ptBR }

export async function getTranslationsServer(locale: Locale) {
  return {
    locale,
    t: (key: string) => {
      const keys = key.split('.')
      let current: unknown = translations[locale]
      for (const k of keys) {
        if (current && typeof current === 'object' && k in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[k]
        } else {
          return key
        }
      }
      return typeof current === 'string' ? current : key
    }
  }
}
