import {
  researchAreas,
  projects,
  publications,
  people,
  simulations,
  codes,
  media,
  documents,
  datasets,
  news,
  events,
} from '@/data'

export type SearchKind =
  | 'researchArea'
  | 'project'
  | 'publication'
  | 'person'
  | 'simulation'
  | 'code'
  | 'media'
  | 'document'
  | 'dataset'
  | 'news'
  | 'event'

export interface SearchEntry {
  id: string
  kind: SearchKind
  to: string
  title: string
  description: string
  haystack: string
}

function entry(id: string, kind: SearchKind, to: string, title: string, description: string, extra: string[] = []): SearchEntry {
  const haystack = [title, description, ...extra].join(' ').toLowerCase()
  return { id, kind, to, title, description, haystack }
}

/**
 * A flat, locale-agnostic search index built once from every public entity.
 * Titles combine all available locale variants so a query in any of the
 * site's three languages can still match — results are re-localized for
 * display by the Search page using the active locale.
 */
export function buildSearchIndex(): SearchEntry[] {
  const index: SearchEntry[] = []

  for (const a of researchAreas) {
    index.push(
      entry(a.id, 'researchArea', `/research/${a.slug}`, a.title.en, a.description, [
        a.title.fr ?? '',
        a.title.ar ?? '',
        ...a.materials,
        ...a.methods,
        ...a.devices,
      ]),
    )
  }

  for (const p of projects) {
    index.push(
      entry(p.id, 'project', `/projects/${p.slug}`, p.name.en, p.description, [
        p.name.fr ?? '',
        p.name.ar ?? '',
        p.acronym ?? '',
        ...p.objectives,
      ]),
    )
  }

  for (const p of publications) {
    index.push(
      entry(p.id, 'publication', `/publications/${p.slug}`, p.title, p.abstract, [
        p.journal,
        ...p.keywords,
        ...p.authors.map((a) => a.name),
      ]),
    )
  }

  for (const p of people) {
    index.push(entry(p.id, 'person', `/people/${p.slug}`, p.name, p.position.en, [p.biography, ...p.researchInterests]))
  }

  for (const s of simulations) {
    index.push(entry(s.id, 'simulation', `/resources/simulations/${s.slug}`, s.title, s.description, [s.category, s.software, ...s.tags]))
  }

  for (const c of codes) {
    index.push(entry(c.id, 'code', `/resources/codes/${c.slug}`, c.title, c.description, [c.category, c.language, ...c.tags]))
  }

  for (const m of media) {
    index.push(entry(m.id, 'media', '/resources/media', m.title, m.description, [m.technique, ...m.tags]))
  }

  for (const d of documents) {
    index.push(entry(d.id, 'document', '/resources/documents', d.title, d.description, [d.category, ...d.tags]))
  }

  for (const d of datasets) {
    index.push(entry(d.id, 'dataset', '/resources/datasets', d.title, d.description, [d.category, ...d.tags]))
  }

  for (const n of news) {
    index.push(entry(n.id, 'news', `/news/${n.slug}`, n.title, n.description, [n.category]))
  }

  for (const e of events) {
    index.push(entry(e.id, 'event', `/events/${e.slug}`, e.title, e.description, [e.category, e.location ?? '']))
  }

  return index
}

export function searchIndex(index: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return index.filter((entry) => entry.haystack.includes(q))
}
