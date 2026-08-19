import { useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { news } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import EmptyState from '@/components/ui/EmptyState'
import NewsCard from '@/components/cards/NewsCard'
import type { NewsCategory } from '@/types'

const ALL = 'all'
const CATEGORIES: NewsCategory[] = ['publications', 'conferences', 'awards', 'members', 'funding', 'collaborations']

export default function NewsIndex() {
  const { t } = useLanguage()
  const [category, setCategory] = useState(ALL)

  const filtered = useMemo(() => news.filter((n) => category === ALL || n.category === category), [category])

  return (
    <>
      <Seo title={t('news.title')} description={t('news.subtitle')} />
      <PageHeader kicker={t('nav.news')} title={t('news.title')} subtitle={t('news.subtitle')} />

      <Container className="py-14">
        <FilterBar active={category !== ALL} onClear={() => setCategory(ALL)}>
          <FilterSelect
            label={t('common.filterBy')}
            value={category}
            onChange={setCategory}
            options={[
              { value: ALL, label: t('common.all') },
              ...CATEGORIES.map((c) => ({ value: c, label: t(`news.cat.${c}`) })),
            ]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {news.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('common.noResults')} />
        )}
      </Container>
    </>
  )
}
