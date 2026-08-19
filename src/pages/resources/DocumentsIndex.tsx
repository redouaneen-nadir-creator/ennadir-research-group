import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { documents } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import DocumentCard from '@/components/cards/DocumentCard'
import type { DocumentCategory } from '@/types'

const ALL = 'all'
const CATEGORIES: DocumentCategory[] = [
  'Report',
  'Deliverable',
  'Proposal',
  'Technical Report',
  'Presentation',
  'Poster',
  'Other',
]

const CATEGORY_LABEL_KEY: Record<DocumentCategory, string> = {
  Report: 'documents.cat.reports',
  Deliverable: 'documents.cat.deliverables',
  Proposal: 'documents.cat.proposals',
  'Technical Report': 'documents.cat.technicalReports',
  Presentation: 'documents.cat.presentations',
  Poster: 'documents.cat.posters',
  Other: 'documents.cat.other',
}

export default function DocumentsIndex() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return documents.filter((d) => {
      if (category !== ALL && d.category !== category) return false
      if (q && !`${d.title} ${d.tags.join(' ')}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, category])

  const active = query !== '' || category !== ALL

  return (
    <>
      <Seo title={t('documents.title')} description={t('documents.subtitle')} />
      <PageHeader kicker={t('nav.resources')} title={t('documents.title')} subtitle={t('documents.subtitle')} />

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.resources'), to: '/resources' }, { label: t('documents.title') }]} />

        <FilterBar
          active={active}
          onClear={() => {
            setQuery('')
            setCategory(ALL)
          }}
        >
          <SearchInput value={query} onChange={setQuery} placeholder={t('search.placeholder')} label={t('nav.search')} />
          <FilterSelect
            label={t('common.filterBy')}
            value={category}
            onChange={setCategory}
            options={[
              { value: ALL, label: t('common.all') },
              ...CATEGORIES.map((c) => ({ value: c, label: t(CATEGORY_LABEL_KEY[c]) })),
            ]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {documents.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <DocumentCard key={doc.id} item={doc} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('common.noResults')} />
        )}
      </Container>
    </>
  )
}
