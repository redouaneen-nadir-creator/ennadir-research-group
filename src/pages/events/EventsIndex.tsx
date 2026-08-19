import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { events } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import EmptyState from '@/components/ui/EmptyState'
import EventCard from '@/components/cards/EventCard'
import type { EventCategory } from '@/types'

const ALL = 'all'
const CATEGORIES: EventCategory[] = ['conferences', 'seminars', 'workshops', 'meetings', 'deadlines']

export default function EventsIndex() {
  const { t } = useLanguage()
  const [category, setCategory] = useState(ALL)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const filtered = useMemo(() => events.filter((e) => category === ALL || e.category === category), [category])
  const upcoming = filtered.filter((e) => (e.endDate || e.date) >= today)
  const past = filtered.filter((e) => (e.endDate || e.date) < today)

  return (
    <>
      <Seo title={t('events.title')} description={t('events.subtitle')} />
      <PageHeader kicker={t('nav.events')} title={t('events.title')} subtitle={t('events.subtitle')} />

      <Container className="py-14">
        <FilterBar active={category !== ALL} onClear={() => setCategory(ALL)}>
          <FilterSelect
            label={t('common.filterBy')}
            value={category}
            onChange={setCategory}
            options={[
              { value: ALL, label: t('common.all') },
              ...CATEGORIES.map((c) => ({ value: c, label: t(`events.cat.${c}`) })),
            ]}
          />
        </FilterBar>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-semibold text-ink-900">{t('events.upcoming')}</h2>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState message={t('common.noResults')} />
          )}
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-xl font-semibold text-ink-900">{t('events.past')}</h2>
          {past.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState message={t('common.noResults')} />
          )}
        </section>
      </Container>
    </>
  )
}
