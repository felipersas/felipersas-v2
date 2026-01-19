'use client'

import { useContext, createContext, ReactNode, useState, useEffect } from 'react'
import enTranslations from '@/i18n/locales/en.json'
import ptTranslations from '@/i18n/locales/pt-BR.json'
import { Locale, locales } from '@/i18n/config'

const translations = {
  en: enTranslations,
  'pt-BR': ptTranslations
}

type TranslationContextType = {
  t: typeof enTranslations
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({
  children,
  initialLocale = 'en'
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  const t = translations[locale] || translations.en

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale
    if (storedLocale && locales.includes(storedLocale)) {
      setLocale(storedLocale)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}

// For server components
export function getTranslations(locale: Locale = 'en') {
  return translations[locale] || translations.en
}
