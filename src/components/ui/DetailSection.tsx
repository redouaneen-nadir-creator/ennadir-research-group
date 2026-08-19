import type { ReactNode } from 'react'

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink-900/15 py-8 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-lg font-semibold text-ink-900">{title}</h2>
      {children}
    </section>
  )
}

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 py-2.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-700/50">{label}</dt>
      <dd className="text-sm text-ink-900">{value}</dd>
    </div>
  )
}

export function InfoGrid({ children }: { children: ReactNode }) {
  return <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">{children}</dl>
}
