import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup } from '@/data'
import { StatusBadge } from '@/components/ui/Badge'
import { formatDate } from '@/utils/format'

export default function ProjectCard({ project }: { project: Project }) {
  const { lt, t, locale } = useLanguage()
  const pi = lookup.person(project.piId)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col rounded border border-ink-900/15 bg-white p-6 transition-colors hover:border-brand-400"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <StatusBadge status={project.status} label={t(`common.${project.status}`)} />
        {project.acronym && (
          <span className="font-mono text-xs font-medium text-ink-700/50">{project.acronym}</span>
        )}
      </div>
      <h3 className="text-base font-semibold text-ink-900 group-hover:text-brand-700">{lt(project.name)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/75">{lt(project.summary)}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink-900/5 pt-3 text-xs text-ink-700/60">
        <span>{formatDate(project.startDate, locale, { year: 'numeric', month: 'short' })}</span>
        {pi && (
          <span>
            {t('common.principalInvestigator')}: {pi.name.replace(/[[\]]/g, '')}
          </span>
        )}
      </div>
    </Link>
  )
}
