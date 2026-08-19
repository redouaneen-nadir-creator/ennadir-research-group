import type { DocumentItem } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Badge from '@/components/ui/Badge'
import { ExternalLinkIcon, DownloadIcon, CalendarIcon } from '@/components/icons'
import { formatDate } from '@/utils/format'

export default function DocumentCard({ item }: { item: DocumentItem }) {
  const { t, locale } = useLanguage()

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-ink-900/8 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{item.category}</Badge>
        <span className="inline-flex items-center gap-1 text-xs text-ink-700/55">
          <CalendarIcon className="h-3.5 w-3.5" />
          {formatDate(item.date, locale)}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-ink-900">{item.title}</h3>
      <p className="text-sm leading-relaxed text-ink-700/70">{item.description}</p>
      <div className="mt-2 flex flex-wrap gap-3 border-t border-ink-900/5 pt-3 text-sm font-medium">
        {item.fileUrl ? (
          <a href={item.fileUrl} className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700">
            <DownloadIcon className="h-4 w-4" />
            {t('common.download')}
          </a>
        ) : (
          <span className="text-ink-700/40">{t('common.addPlaceholder')}</span>
        )}
        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            {t('common.externalLink')}
          </a>
        )}
      </div>
    </div>
  )
}
