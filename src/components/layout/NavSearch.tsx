import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { SearchIcon } from '@/components/icons'

export default function NavSearch({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <form onSubmit={onSubmit} role="search" className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" />
      <label htmlFor="nav-search" className="sr-only">
        {t('nav.search')}
      </label>
      <input
        id="nav-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('search.placeholder')}
        className="w-full rounded-full border border-ink-900/10 bg-ink-900/[0.03] py-2 ps-9 pe-3 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-400 focus:bg-white"
      />
    </form>
  )
}
