import { useLanguage } from '@/i18n/LanguageContext'
import { LOCALES, LOCALE_SHORT, LOCALE_LABELS } from '@/i18n/types'

export default function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, setLocale, t } = useLanguage()

  const wrap = tone === 'light' ? 'border-white/25 text-white/75' : 'border-ink-900/15 text-ink-700'
  const active = tone === 'light' ? 'bg-accent-500 text-ink-950' : 'bg-brand-700 text-white'

  return (
    <div
      role="group"
      aria-label={t('footer.language')}
      className={`inline-flex items-center gap-0.5 rounded-sm border p-0.5 text-xs font-semibold ${wrap}`}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={LOCALE_LABELS[code]}
          className={`rounded-sm px-2.5 py-1 transition-colors ${
            locale === code ? active : 'hover:text-current/100 opacity-80 hover:opacity-100'
          }`}
        >
          {LOCALE_SHORT[code]}
        </button>
      ))}
    </div>
  )
}
