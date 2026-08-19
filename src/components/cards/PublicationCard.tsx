import { Link } from 'react-router-dom'
import type { Publication } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Badge from '@/components/ui/Badge'

export default function PublicationCard({ publication }: { publication: Publication }) {
  const { t } = useLanguage()
  const authorNames = publication.authors.map((a) => a.name).join(', ')

  return (
    <Link
      to={`/publications/${publication.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{publication.year}</Badge>
        <span className="text-xs font-medium uppercase tracking-wide text-ink-700/50">
          {publication.type}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
        {publication.title}
      </h3>
      <p className="text-sm text-ink-700/70">{authorNames}</p>
      <p className="text-sm italic text-ink-700/60">{publication.journal}</p>
      {publication.doi && (
        <span className="mt-1 text-xs font-medium text-brand-600">{t('common.viewOnDoi')}</span>
      )}
    </Link>
  )
}
