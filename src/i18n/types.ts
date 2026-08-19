export type Locale = 'en' | 'fr' | 'ar'

export const LOCALES: Locale[] = ['en', 'fr', 'ar']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
}

export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'ع',
}

export const RTL_LOCALES: Locale[] = ['ar']

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale)
}

/**
 * Text that can carry a translation per locale. Only `en` is required so
 * sample content can be added without translating every field up front;
 * missing fr/ar fall back to `en`.
 */
export interface LocalizedText {
  en: string
  fr?: string
  ar?: string
}

export function localize(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === 'string') return text
  return text[locale] || text.en
}
