import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'

export default function ResourceCardShell({
  to,
  category,
  title,
  description,
  meta,
  tags,
}: {
  to: string
  category: string
  title: string
  description?: string
  meta?: ReactNode
  tags?: string[]
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-2 rounded border border-ink-900/15 bg-white p-6 transition-colors hover:border-brand-400"
    >
      <Badge tone="brand">{category}</Badge>
      <h3 className="text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">{title}</h3>
      {description && <p className="line-clamp-2 text-sm leading-relaxed text-ink-700/70">{description}</p>}
      {meta && <div className="text-xs text-ink-700/55">{meta}</div>}
      {tags && tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-ink-900/5 px-2 py-0.5 text-[11px] text-ink-700/70">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
