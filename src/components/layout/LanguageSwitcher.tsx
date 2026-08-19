import { useLanguage } from '@/i18n/LanguageContext'
import { LOCALES, LOCALE_SHORT, LOCALE_LABELS } from '@/i18n/types'

export default function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, setLocale, t } = useLanguage()

  const wrap = tone === 'light' ? 'bg-white/10 text-white/80' : 'bg-ink-900/5 text-ink-700'
  const active = tone === 'light' ? 'bg-white text-ink-900' : 'bg-white text-ink-900 shadow-sm'

  return (
    <div
      role="group"
      aria-label={t('footer.language')}
      className={`inline-flex items-center gap-0.5 rounded-full p-1 text-xs font-semibold ${wrap}`}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          aria-label={LOCALE_LABELS[code]}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === code ? active : 'hover:text-current/100 opacity-80 hover:opacity-100'
          }`}
        >
          {LOCALE_SHORT[code]}
        </button>
      ))}
    </div>
  )
}
