import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { datasets } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import DatasetCard from '@/components/cards/DatasetCard'
import type { DatasetCategory } from '@/types'

const ALL = 'all'
const CATEGORIES: DatasetCategory[] = ['Dataset', 'Model', 'Experimental Data', 'External Link']

export default function DatasetsIndex() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return datasets.filter((d) => {
      if (category !== ALL && d.category !== category) return false
      if (q && !`${d.title} ${d.tags.join(' ')}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, category])

  const active = query !== '' || category !== ALL

  return (
    <>
      <Seo title={t('resources.cat.datasets')} />
      <PageHeader kicker={t('nav.resources')} title={t('resources.cat.datasets')} subtitle={t('resources.subtitle')} />

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.resources'), to: '/resources' }, { label: t('resources.cat.datasets') }]} />

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
            options={[{ value: ALL, label: t('common.all') }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {datasets.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DatasetCard key={d.id} item={d} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('common.noResults')} />
        )}
      </Container>
    </>
  )
}
