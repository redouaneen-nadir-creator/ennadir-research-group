import { useMemo, useState, useEffect, type FormEvent } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { buildSearchIndex, searchIndex, type SearchKind } from '@/utils/search'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import { ArrowRightIcon } from '@/components/icons'

const KIND_LABEL_KEY: Record<SearchKind, string> = {
  researchArea: 'nav.research',
  project: 'nav.projects',
  publication: 'nav.publications',
  person: 'nav.people',
  simulation: 'resources.cat.simulations',
  code: 'resources.cat.codes',
  media: 'resources.cat.media',
  document: 'resources.cat.documents',
  dataset: 'resources.cat.datasets',
  news: 'nav.news',
  event: 'nav.events',
}

const KIND_ORDER: SearchKind[] = [
  'project',
  'publication',
  'person',
  'researchArea',
  'simulation',
  'code',
  'media',
  'document',
  'dataset',
  'news',
  'event',
]

export default function Search() {
  const { t } = useLanguage()
  const [params, setParams] = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)

  useEffect(() => setQuery(urlQuery), [urlQuery])

  const index = useMemo(() => buildSearchIndex(), [])
  const results = useMemo(() => searchIndex(index, urlQuery), [index, urlQuery])

  const grouped = useMemo(() => {
    const map = new Map<SearchKind, typeof results>()
    for (const kind of KIND_ORDER) map.set(kind, [])
    for (const r of results) map.get(r.kind)?.push(r)
    return map
  }, [results])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setParams(query.trim() ? { q: query.trim() } : {})
  }

  return (
    <>
      <Seo title={t('search.title')} />
      <PageHeader kicker={t('nav.search')} title={t('search.title')} />

      <Container className="py-14">
        <form onSubmit={onSubmit} className="mb-10 max-w-xl">
          <SearchInput value={query} onChange={setQuery} placeholder={t('search.placeholder')} label={t('search.title')} />
        </form>

        {!urlQuery ? (
          <EmptyState message={t('search.startTyping')} />
        ) : results.length === 0 ? (
          <EmptyState message={`${t('search.noResultsFor')} "${urlQuery}"`} />
        ) : (
          <div className="space-y-10">
            <p className="text-sm text-ink-700/60">
              {results.length} {t('search.resultsCount')} — {t('search.resultsFor')} "{urlQuery}"
            </p>
            {KIND_ORDER.map((kind) => {
              const items = grouped.get(kind) ?? []
              if (items.length === 0) return null
              return (
                <section key={kind}>
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-700">
                    {t(KIND_LABEL_KEY[kind])}
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600">
                      {items.length}
                    </span>
                  </h2>
                  <ul className="divide-y divide-ink-900/6 overflow-hidden rounded-xl border border-ink-900/8 bg-white">
                    {items.map((item) => (
                      <li key={`${item.kind}-${item.id}`}>
                        <Link to={item.to} className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-brand-50/60">
                          <span>
                            <span className="block text-sm font-medium text-ink-900 group-hover:text-brand-700">
                              {item.title}
                            </span>
                            {item.description && (
                              <span className="mt-0.5 line-clamp-1 block text-xs text-ink-700/55">
                                {item.description}
                              </span>
                            )}
                          </span>
                          <ArrowRightIcon className="h-4 w-4 shrink-0 text-ink-700/40 group-hover:text-brand-600 rtl:rotate-180" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </Container>
    </>
  )
}
