import type { ReactNode } from 'react'
import Container from './Container'

export default function PageHeader({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker?: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <header className="border-b border-ink-900/5 bg-gradient-to-b from-ink-950 to-ink-900 text-white">
      <Container className="py-14 sm:py-16">
        {kicker && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{kicker}</p>
        )}
        <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  )
}
