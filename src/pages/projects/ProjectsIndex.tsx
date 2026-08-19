import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { projects, researchAreas, people } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import EmptyState from '@/components/ui/EmptyState'
import ProjectCard from '@/components/cards/ProjectCard'
import type { ProjectStatus } from '@/types'

const ALL = 'all'

export default function ProjectsIndex() {
  const { t, lt } = useLanguage()
  const [status, setStatus] = useState<string>(ALL)
  const [area, setArea] = useState<string>(ALL)
  const [year, setYear] = useState<string>(ALL)
  const [researcher, setResearcher] = useState<string>(ALL)

  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.startDate.slice(0, 4)))).sort().reverse(),
    [],
  )

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (status !== ALL && p.status !== status) return false
      if (area !== ALL && !p.researchAreaIds.includes(area)) return false
      if (year !== ALL && p.startDate.slice(0, 4) !== year) return false
      if (researcher !== ALL && p.piId !== researcher && !p.researcherIds.includes(researcher)) return false
      return true
    })
  }, [status, area, year, researcher])

  const active = status !== ALL || area !== ALL || year !== ALL || researcher !== ALL

  function clear() {
    setStatus(ALL)
    setArea(ALL)
    setYear(ALL)
    setResearcher(ALL)
  }

  return (
    <>
      <Seo title={t('projects.title')} description={t('projects.subtitle')} />
      <PageHeader kicker={t('nav.projects')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

      <Container className="py-14">
        <FilterBar onClear={clear} active={active}>
          <FilterSelect
            label={t('projects.filterStatus')}
            value={status}
            onChange={setStatus}
            options={[
              { value: ALL, label: t('common.all') },
              { value: 'active' satisfies ProjectStatus, label: t('common.active') },
              { value: 'completed' satisfies ProjectStatus, label: t('common.completed') },
              { value: 'planned' satisfies ProjectStatus, label: t('common.planned') },
            ]}
          />
          <FilterSelect
            label={t('projects.filterArea')}
            value={area}
            onChange={setArea}
            options={[
              { value: ALL, label: t('common.all') },
              ...researchAreas.map((a) => ({ value: a.id, label: lt(a.title) })),
            ]}
          />
          <FilterSelect
            label={t('projects.filterYear')}
            value={year}
            onChange={setYear}
            options={[{ value: ALL, label: t('common.all') }, ...years.map((y) => ({ value: y, label: y }))]}
          />
          <FilterSelect
            label={t('projects.filterResearcher')}
            value={researcher}
            onChange={setResearcher}
            options={[
              { value: ALL, label: t('common.all') },
              ...people.map((p) => ({ value: p.id, label: p.name })),
            ]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {projects.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('projects.noneFound')} />
        )}
      </Container>
    </>
  )
}
