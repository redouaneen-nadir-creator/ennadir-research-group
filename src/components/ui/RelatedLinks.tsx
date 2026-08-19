import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/icons'

export interface RelatedLinkItem {
  to: string
  label: string
  meta?: string
}

export default function RelatedLinks({ items }: { items: RelatedLinkItem[] }) {
  return (
    <ul className="divide-y divide-ink-900/6 overflow-hidden rounded border border-ink-900/15">
      {items.map((item, index) => (
        // `to` alone isn't always unique: several resource kinds (media,
        // documents, datasets) link to a shared index page rather than a
        // per-item detail route, so multiple related items can share an href.
        <li key={`${item.to}-${item.label}-${index}`}>
          <Link
            to={item.to}
            className="group flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-brand-50/60"
          >
            <span>
              <span className="font-medium text-ink-900 group-hover:text-brand-700">{item.label}</span>
              {item.meta && <span className="ms-2 text-xs text-ink-700/55">{item.meta}</span>}
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-ink-700/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
