import type { ReactNode } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

export default function FilterBar({
  children,
  onClear,
  active,
}: {
  children: ReactNode
  onClear: () => void
  active: boolean
}) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-wrap items-end gap-4 rounded border border-ink-900/15 bg-ink-900/[0.02] p-4 sm:p-5">
      {children}
      {active && (
        <button
          type="button"
          onClick={onClear}
          className="mb-0.5 rounded px-3 py-2 text-xs font-medium text-brand-600 hover:bg-brand-50"
        >
          {t('common.clearFilters')}
        </button>
      )}
    </div>
  )
}
