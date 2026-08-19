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
      className="group flex flex-col gap-2 rounded-2xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
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
