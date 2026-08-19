import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@/components/icons'

export interface Crumb {
  label: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-700/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRightIcon className="h-3 w-3 rtl:rotate-180" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-900/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
