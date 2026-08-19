import type { Locale } from '@/i18n/types'

const INTL_LOCALE: Record<Locale, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-MA' }

/** Formats a YYYY-MM-DD or YYYY-MM date string for display; falls back to the raw string if unparseable. */
export function formatDate(value: string | undefined, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  if (!value) return ''
  const parts = value.split('-').map(Number)
  if (parts.some(Number.isNaN)) return value
  const [year, month, day] = parts
  const date = new Date(year, (month || 1) - 1, day || 1)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(
    INTL_LOCALE[locale],
    options ?? (day ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' }),
  ).format(date)
}
