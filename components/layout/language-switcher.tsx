'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { Locale, localeNames, locales } from '@/i18n/config'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-1 lofi-glow"
        aria-label="Change language"
      >
        <span>{localeNames[locale as Locale]}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-1 bg-background border border-border rounded-md shadow-lg z-50 min-w-[120px]">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                loc === locale ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
