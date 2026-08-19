import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { media, lookup } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FilterBar from '@/components/ui/FilterBar'
import FilterSelect from '@/components/ui/FilterSelect'
import SearchInput from '@/components/ui/SearchInput'
import EmptyState from '@/components/ui/EmptyState'
import MediaTile from '@/components/cards/MediaTile'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { CloseIcon } from '@/components/icons'
import type { MediaItem, MediaTechnique } from '@/types'

const ALL = 'all'
const TECHNIQUES: MediaTechnique[] = [
  'SEM',
  'TEM',
  'AFM',
  'XRD',
  'Raman',
  'PL',
  'Device Image',
  'Schematic',
  'Figure',
  'Graphical Abstract',
  'Video',
]

export default function MediaGallery() {
  const { t, lt } = useLanguage()
  const [query, setQuery] = useState('')
  const [technique, setTechnique] = useState(ALL)
  const [active, setActive] = useState<MediaItem | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return media.filter((m) => {
      if (technique !== ALL && m.technique !== technique) return false
      if (q && !`${m.title} ${m.tags.join(' ')} ${m.material ?? ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, technique])

  const authors = active ? lookup.people(active.authorPersonIds) : []
  const filterActive = query !== '' || technique !== ALL

  return (
    <>
      <Seo title={t('media.title')} description={t('media.subtitle')} />
      <PageHeader kicker={t('nav.resources')} title={t('media.title')} subtitle={t('media.subtitle')} />

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.resources'), to: '/resources' }, { label: t('media.title') }]} />

        <FilterBar
          active={filterActive}
          onClear={() => {
            setQuery('')
            setTechnique(ALL)
          }}
        >
          <SearchInput value={query} onChange={setQuery} placeholder={t('search.placeholder')} label={t('nav.search')} />
          <FilterSelect
            label={t('media.technique')}
            value={technique}
            onChange={setTechnique}
            options={[{ value: ALL, label: t('common.all') }, ...TECHNIQUES.map((tq) => ({ value: tq, label: tq }))]}
          />
        </FilterBar>

        <p className="my-6 text-sm text-ink-700/60">
          {filtered.length} / {media.length}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <MediaTile key={item.id} item={item} onOpen={() => setActive(item)} />
            ))}
          </div>
        ) : (
          <EmptyState message={t('common.noResults')} />
        )}
      </Container>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {active.imageUrl ? (
              <img src={active.imageUrl} alt={active.title} className="max-h-[50vh] w-full object-contain bg-ink-950" />
            ) : (
              <PlaceholderImage label={active.technique} className="h-64 w-full" />
            )}
            <div className="flex items-start justify-between gap-4 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{active.technique}</p>
                <h2 className="mt-1 text-lg font-semibold text-ink-900">{active.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-700/75">{active.description}</p>
                {authors.length > 0 && (
                  <p className="mt-3 text-xs text-ink-700/55">
                    {t('common.author')}: {authors.map((a) => a.name).join(', ')}
                  </p>
                )}
                {active.copyright && <p className="mt-1 text-xs text-ink-700/45">{active.copyright}</p>}
                {active.projectIds.length > 0 && (
                  <p className="mt-1 text-xs text-ink-700/55">
                    {t('common.project')}:{' '}
                    {lookup
                      .projects(active.projectIds)
                      .map((p) => lt(p.name))
                      .join(', ')}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={t('common.close')}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
