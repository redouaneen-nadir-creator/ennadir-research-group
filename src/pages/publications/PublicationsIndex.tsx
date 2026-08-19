import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { publications, researchAreas, projects, people } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import PublicationCard from '@/components/cards/PublicationCard'

const ALL = 'all'

export default function PublicationsIndex() {
  const { t, lt } = useLanguage()
  const [query, setQuery] = useState('')
  const [year, setYear] = useState(ALL)
  const [area, setArea] = useState(ALL)
  const [project, setProject] = useState(ALL)
  const [journal, setJournal] = useState(ALL)
  const [author, setAuthor] = useState(ALL)

  const years = useMemo(() => Array.from(new Set(publications.map((p) => String(p.year)))).sort().reverse(), [])
  const journals = useMemo(() => Array.from(new Set(publications.map((p) => p.journal))).sort(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((p) => {
      if (year !== ALL && String(p.year) !== year) return false
      if (area !== ALL && !p.researchAreaIds.includes(area)) return false
      if (project !== ALL && !p.projectIds.includes(project)) return false
      if (journal !== ALL && p.journal !== journal) return false
      if (author !== ALL && !p.authors.some((a) => a.personId === author)) return false
      if (q) {
        const haystack = `${p.title} ${p.authors.map((a) => a.name).join(' ')} ${p.keywords.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [query, year, area, project, journal, author])

  const active = query !== '' || year !== ALL || area !== ALL || project !== ALL || journal !== ALL || author !== ALL

  function clear() {
    setQuery('')
    setYear(ALL)
    setArea(ALL)
    setProject(ALL)
    setJournal(ALL)
    setAuthor(ALL)
  }

  return (
    <>
      <Seo title={t('publications.title')} description={t('publications.subtitle')} />
      <PageHeader kicker={t('nav.publications')} title={t('publications.title')} subtitle={t('publications.subtitle')} />

      <Container className="py-14">
        <FilterBar onClear={clear} active={active}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={t('publications.searchPlaceholder')}
            label={t('nav.search')}
          />
          <FilterSelect
            label={t('publications.filterYear')}
            value={year}
            onChange={setYear}
            options={[{ value: ALL, label: t('common.all') }, ...years.map((y) => ({ value: y, label: y }))]}
          />
          <FilterSelect
            label={t('publications.filterArea')}
            value={area}
            onChange={setArea}
            options={[
              { value: ALL, label: t('common.all') },
              ...researchAreas.map((a) => ({ value: a.id, label: lt(a.title) })),
            ]}
          />
          <FilterSelect
            label={t('publications.filterProject')}
            value={project}
            onChange={setProject}
            options={[
              { value: ALL, label: t('common.all') },
              ...projects.map((p) => ({ value: p.id, label: lt(p.name) })),
            ]}
          />
          <FilterSelect
            label={t('publications.filterJournal')}
            value={journal}
            onChange={setJournal}
            options={[{ value: ALL, label: t('common.all') }, ...journals.map((j) => ({ value: j, label: j }))]}
          />
          <FilterSelect
            label={t('publications.filterAuthor')}
            value={author}
            onChange={setAuthor}
            options={[
              { value: ALL, label: t('common.all') },
              ...people.map((p) => ({ value: p.id, label: p.name })),
            ]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {publications.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('publications.noneFound')} />
        )}
      </Container>
    </>
  )
}
