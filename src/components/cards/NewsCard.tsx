import { Link } from 'react-router-dom'
import type { NewsItem } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/utils/format'

export default function NewsCard({ item }: { item: NewsItem }) {
  const { t, locale } = useLanguage()

  return (
    <Link
      to={`/news/${item.slug}`}
      className="group flex flex-col gap-2 rounded border border-ink-900/15 bg-white p-6 transition-colors hover:border-brand-400"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{t(`news.cat.${item.category}`)}</Badge>
        <span className="text-xs text-ink-700/55">{formatDate(item.date, locale)}</span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
        {item.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-ink-700/70">{item.description}</p>
    </Link>
  )
}
