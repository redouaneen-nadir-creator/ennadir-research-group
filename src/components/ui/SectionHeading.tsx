import type { ReactNode } from 'react'

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  action,
  align = 'start',
}: {
  kicker?: string
  title: string
  subtitle?: string
  action?: ReactNode
  align?: 'start' | 'center'
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'text-center sm:text-start' : ''
      }`}
    >
      <div className="max-w-2xl">
        {kicker && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{kicker}</p>
        )}
        <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-[15px] leading-relaxed text-ink-700/80">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
