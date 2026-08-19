import type { DatasetItem } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Badge from '@/components/ui/Badge'
import { ExternalLinkIcon, DownloadIcon } from '@/components/icons'

export default function DatasetCard({ item }: { item: DatasetItem }) {
  const { t } = useLanguage()
  const meta = [item.format, item.size].filter(Boolean).join(' · ')

  return (
    <div className="flex flex-col gap-2 rounded border border-ink-900/15 bg-white p-6">
      <Badge tone="brand">{item.category}</Badge>
      <h3 className="text-base font-semibold leading-snug text-ink-900">{item.title}</h3>
      <p className="text-sm leading-relaxed text-ink-700/70">{item.description}</p>
      {meta && <p className="text-xs text-ink-700/55">{meta}</p>}
      {item.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-ink-900/5 px-2 py-0.5 text-[11px] text-ink-700/70">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-3 border-t border-ink-900/5 pt-3 text-sm font-medium">
        {item.downloadUrl ? (
          <a href={item.downloadUrl} className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700">
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
