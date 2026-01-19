import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}

/**
 * Get time-based greeting
 */
export function getGreeting(locale: string = 'en'): string {
  const hour = new Date().getHours()
  const greetings = {
    en: {
      morning: 'Good morning, coffee\'s ready ☕',
      afternoon: 'Good afternoon, hope you\'re having a great day',
      evening: 'Good evening, time to unwind',
      night: 'Late night coding? I\'ve been there 🌙'
    },
    'pt-BR': {
      morning: 'Bom dia, o café está pronto ☕',
      afternoon: 'Boa tarde, espero que esteja tendo um ótimo dia',
      evening: 'Boa noite, hora de relaxar',
      night: 'Codando tarde da noite? Eu já estive lá 🌙'
    }
  }

  const lang = locale as 'en' | 'pt-BR'
  const greetingSet = greetings[lang] || greetings.en

  if (hour >= 5 && hour < 12) return greetingSet.morning
  if (hour >= 12 && hour < 18) return greetingSet.afternoon
  if (hour >= 18 && hour < 22) return greetingSet.evening
  return greetingSet.night
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
