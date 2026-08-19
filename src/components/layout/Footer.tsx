import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import Container from '@/components/ui/Container'
import { MailIcon } from '@/components/icons'

const SECTION_LINKS = [
  { key: 'nav.research', to: '/research' },
  { key: 'nav.projects', to: '/projects' },
  { key: 'nav.publications', to: '/publications' },
  { key: 'nav.people', to: '/people' },
  { key: 'nav.resources', to: '/resources' },
]

const QUICK_LINKS = [
  { key: 'nav.news', to: '/news' },
  { key: 'nav.events', to: '/events' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
  { key: 'nav.search', to: '/search' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-ink-900/8 bg-ink-950 text-white/70">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="7.5" className="stroke-brand-300" strokeWidth="1.6" />
                <ellipse cx="12" cy="12" rx="7.5" ry="2.8" className="stroke-accent-400" strokeWidth="1.3" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="7.5"
                  ry="2.8"
                  transform="rotate(60 12 12)"
                  className="stroke-accent-400"
                  strokeWidth="1.3"
                />
              </svg>
            </span>
            <span className="font-serif text-base font-semibold text-white">{t('meta.siteName')}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{t('meta.tagline')}</p>
          <a
            href="mailto:radouaneennadir@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <MailIcon className="h-4 w-4" />
            radouaneennadir@gmail.com
          </a>
        </div>

        <nav aria-label={t('footer.sections')}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t('footer.sections')}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {SECTION_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('footer.quickLinks')}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            {t('footer.quickLinks')}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/10 bg-black/20">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('meta.siteName')} — {t('footer.rights')}{' '}
            <span className="text-white/40">
              {t('footer.publisher')} PSyPro.
            </span>
          </p>
          <p className="max-w-2xl text-white/40">{t('footer.sampleDataNotice')}</p>
        </Container>
      </div>
    </footer>
  )
}
