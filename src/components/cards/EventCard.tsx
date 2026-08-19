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
      className="group flex flex-col gap-2 rounded border border-ink-900/15 bg-white p-6 transition-colors hover:border-brand-400"
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
