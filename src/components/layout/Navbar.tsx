import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import NavSearch from './NavSearch'
import Container from '@/components/ui/Container'
import { MenuIcon, CloseIcon, SearchIcon } from '@/components/icons'

const NAV_ITEMS: { key: string; to: string }[] = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.research', to: '/research' },
  { key: 'nav.projects', to: '/projects' },
  { key: 'nav.publications', to: '/publications' },
  { key: 'nav.people', to: '/people' },
  { key: 'nav.resources', to: '/resources' },
  { key: 'nav.news', to: '/news' },
  { key: 'nav.events', to: '/events' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-white/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        {t('nav.skipToContent')}
      </a>

      <Container className="flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="7.5" className="stroke-brand-400" strokeWidth="1.6" />
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
          <span className="hidden font-serif text-[15px] font-semibold leading-tight text-ink-900 sm:block">
            {t('meta.siteName')}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-900/5 hover:text-ink-900'
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <NavSearch className="hidden w-48 xl:block" />
          <Link
            to="/search"
            aria-label={t('nav.search')}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5 xl:hidden"
          >
            <SearchIcon className="h-4.5 w-4.5" />
          </Link>
          <LanguageSwitcher tone="dark" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-900/10 text-ink-900 lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-ink-900/8 bg-white lg:hidden">
          <Container className="flex flex-col gap-4 py-5">
            <NavSearch />
            <nav aria-label="Mobile main">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2.5 text-[15px] font-medium ${
                          isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-ink-900/5'
                        }`
                      }
                    >
                      {t(item.key)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-between border-t border-ink-900/8 pt-4">
              <span className="text-xs font-medium uppercase tracking-wide text-ink-700/60">
                {t('footer.language')}
              </span>
              <LanguageSwitcher tone="dark" />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
