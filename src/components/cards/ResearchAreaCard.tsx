import { Link } from 'react-router-dom'
import type { ResearchArea } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { AreaIcon, ArrowRightIcon } from '@/components/icons'

export default function ResearchAreaCard({ area }: { area: ResearchArea }) {
  const { lt, t } = useLanguage()

  return (
    <Link
      to={`/research/${area.slug}`}
      className="group flex flex-col rounded-2xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
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
