import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from './locales/en'
import fr from './locales/fr'
import ar from './locales/ar'
import { type Locale, type LocalizedText, isRtl, localize } from './types'

const DICTIONARIES: Record<Locale, Record<string, string>> = { en, fr, ar }

const STORAGE_KEY = 'ennadir-research-locale'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: 'ltr' | 'rtl'
  t: (key: string) => string
  lt: (text: LocalizedText | string) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'fr' || stored === 'ar') return stored
  const browser = window.navigator.language.slice(0, 2)
  if (browser === 'fr' || browser === 'ar') return browser
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale)

  const dir = isRtl(locale) ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo<LanguageContextValue>(() => {
    const dict = DICTIONARIES[locale]
    return {
      locale,
      setLocale,
      dir,
      t: (key: string) => dict[key] ?? DICTIONARIES.en[key] ?? key,
      lt: (text: LocalizedText | string) => localize(text, locale),
    }
  }, [locale, dir])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
