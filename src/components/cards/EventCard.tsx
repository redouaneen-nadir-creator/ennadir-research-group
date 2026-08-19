import { Link } from 'react-router-dom'
import type { EventItem } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Badge from '@/components/ui/Badge'
import { CalendarIcon, PinIcon } from '@/components/icons'
import { formatDate } from '@/utils/format'

export default function EventCard({ item }: { item: EventItem }) {
  const { t, locale } = useLanguage()

  return (
    <Link
      to={`/events/${item.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <Badge tone="brand">{t(`events.cat.${item.category}`)}</Badge>
      <h3 className="text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
        {item.title}
      </h3>
      <div className="flex flex-col gap-1 text-xs text-ink-700/60">
        <span className="inline-flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5" />
          {formatDate(item.date, locale)}
          {item.endDate ? ` – ${formatDate(item.endDate, locale)}` : ''}
        </span>
        {item.location && (
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5" />
            {item.location}
          </span>
        )}
      </div>
    </Link>
  )
}
