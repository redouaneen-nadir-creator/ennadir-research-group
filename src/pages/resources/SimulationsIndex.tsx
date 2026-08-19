import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { simulations } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import SimulationCard from '@/components/cards/SimulationCard'
import type { SimulationCategory } from '@/types'

const ALL = 'all'
const CATEGORIES: SimulationCategory[] = [
  'Silvaco ATLAS',
  'SCAPS-1D',
  'COMSOL',
  'Python',
  'MATLAB',
  'FEM',
  'Monte Carlo',
  'Machine Learning',
  'TCAD',
]

export default function SimulationsIndex() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return simulations.filter((s) => {
      if (category !== ALL && s.category !== category) return false
      if (q && !`${s.title} ${s.tags.join(' ')} ${s.material ?? ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, category])

  const active = query !== '' || category !== ALL

  return (
    <>
      <Seo title={t('simulations.title')} description={t('simulations.subtitle')} />
      <PageHeader kicker={t('nav.resources')} title={t('simulations.title')} subtitle={t('simulations.subtitle')} />

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.resources'), to: '/resources' }, { label: t('simulations.title') }]} />

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
          {filtered.length} / {simulations.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SimulationCard key={s.id} simulation={s} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('common.noResults')} />
        )}
      </Container>
    </>
  )
}
