import type { ReactNode } from 'react'

type Tone = 'brand' | 'accent' | 'neutral' | 'amber'

const TONES: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200',
  accent: 'bg-accent-500/10 text-accent-600 ring-1 ring-inset ring-accent-500/30',
  neutral: 'bg-ink-900/5 text-ink-700 ring-1 ring-inset ring-ink-900/10',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
}

export default function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status, label }: { status: 'active' | 'completed' | 'planned'; label: string }) {
  const tone: Tone = status === 'active' ? 'accent' : status === 'planned' ? 'amber' : 'neutral'
  return <Badge tone={tone}>{label}</Badge>
}
