import { Link } from 'react-router-dom'
import type { ResearchArea } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { AreaIcon, ArrowRightIcon } from '@/components/icons'

// A small jewel-tone rotation so the research-area grid reads as an
// illuminated catalog rather than one flat color repeated eight times.
// Picked deterministically from the area id so a given area always
// shows the same tone, on the homepage teaser and the full index alike.
const TONES = [
  { badge: 'border-brand-200 bg-brand-50 text-brand-700', hover: 'hover:border-brand-400' },
  { badge: 'border-accent-300 bg-accent-200/40 text-accent-700', hover: 'hover:border-accent-500' },
  { badge: 'border-jewel-teal/30 bg-jewel-teal/10 text-jewel-teal', hover: 'hover:border-jewel-teal' },
  { badge: 'border-jewel-emerald/30 bg-jewel-emerald/10 text-jewel-emerald', hover: 'hover:border-jewel-emerald' },
]

function toneFor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return TONES[hash % TONES.length]
}

export default function ResearchAreaCard({ area }: { area: ResearchArea }) {
  const { lt, t } = useLanguage()
  const tone = toneFor(area.id)

  return (
    <Link
      to={`/research/${area.slug}`}
      className={`group flex flex-col rounded border border-ink-900/15 bg-white p-6 transition-colors ${tone.hover}`}
    >
      <span className={`mb-4 grid h-11 w-11 place-items-center rounded-full border ${tone.badge}`}>
        <AreaIcon name={area.icon} className="h-5.5 w-5.5" />
      </span>
      <h3 className="text-base font-semibold text-ink-900">{lt(area.title)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/75">{lt(area.summary)}</p>
      <span className="link-underline mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-600">
        {t('common.learnMore')}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </span>
    </Link>
  )
}
