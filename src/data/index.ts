import researchAreasRaw from './researchAreas.json'
import facilitiesRaw from './facilities.json'
import peopleRaw from './people.json'
import projectsRaw from './projects.json'
import publicationsRaw from './publications.json'
import simulationsRaw from './simulations.json'
import codesRaw from './codes.json'
import mediaRaw from './media.json'
import documentsRaw from './documents.json'
import datasetsRaw from './datasets.json'
import newsRaw from './news.json'
import eventsRaw from './events.json'

import type {
  ResearchArea,
  Facility,
  Person,
  Project,
  Publication,
  Simulation,
  CodeEntry,
  MediaItem,
  DocumentItem,
  DatasetItem,
  NewsItem,
  EventItem,
} from '@/types'
import { publicOnly } from '@/utils/visibility'

export const researchAreas = publicOnly(researchAreasRaw as ResearchArea[])
export const facilities = publicOnly(facilitiesRaw as Facility[])
export const people = publicOnly(peopleRaw as Person[])
export const projects = publicOnly(projectsRaw as Project[])
export const publications = publicOnly(publicationsRaw as Publication[]).sort((a, b) => b.year - a.year)
export const simulations = publicOnly(simulationsRaw as Simulation[])
export const codes = publicOnly(codesRaw as CodeEntry[])
export const media = publicOnly(mediaRaw as MediaItem[])
export const documents = publicOnly(documentsRaw as DocumentItem[])
export const datasets = publicOnly(datasetsRaw as DatasetItem[])
export const news = publicOnly(newsRaw as NewsItem[]).sort((a, b) => (a.date < b.date ? 1 : -1))
export const events = publicOnly(eventsRaw as EventItem[]).sort((a, b) => (a.date < b.date ? 1 : -1))

function indexBy<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

const researchAreaIndex = indexBy(researchAreas)
const peopleIndex = indexBy(people)
const projectIndex = indexBy(projects)
const publicationIndex = indexBy(publications)
const simulationIndex = indexBy(simulations)
const codeIndex = indexBy(codes)
const mediaIndex = indexBy(media)
const documentIndex = indexBy(documents)
const datasetIndex = indexBy(datasets)

function byIds<T>(index: Map<string, T>, ids: string[] | undefined): T[] {
  if (!ids) return []
  return ids.map((id) => index.get(id)).filter((item): item is T => Boolean(item))
}

export const lookup = {
  researchArea: (id: string) => researchAreaIndex.get(id),
  person: (id: string) => peopleIndex.get(id),
  project: (id: string) => projectIndex.get(id),
  publication: (id: string) => publicationIndex.get(id),
  simulation: (id: string) => simulationIndex.get(id),
  code: (id: string) => codeIndex.get(id),
  mediaItem: (id: string) => mediaIndex.get(id),
  document: (id: string) => documentIndex.get(id),
  dataset: (id: string) => datasetIndex.get(id),

  researchAreas: (ids: string[] | undefined) => byIds(researchAreaIndex, ids),
  people: (ids: string[] | undefined) => byIds(peopleIndex, ids),
  projects: (ids: string[] | undefined) => byIds(projectIndex, ids),
  publications: (ids: string[] | undefined) => byIds(publicationIndex, ids),
  simulations: (ids: string[] | undefined) => byIds(simulationIndex, ids),
  codes: (ids: string[] | undefined) => byIds(codeIndex, ids),
  media: (ids: string[] | undefined) => byIds(mediaIndex, ids),
  documents: (ids: string[] | undefined) => byIds(documentIndex, ids),
  datasets: (ids: string[] | undefined) => byIds(datasetIndex, ids),

  bySlug: {
    researchArea: (slug: string) => researchAreas.find((item) => item.slug === slug),
    person: (slug: string) => people.find((item) => item.slug === slug),
    project: (slug: string) => projects.find((item) => item.slug === slug),
    publication: (slug: string) => publications.find((item) => item.slug === slug),
    simulation: (slug: string) => simulations.find((item) => item.slug === slug),
    code: (slug: string) => codes.find((item) => item.slug === slug),
    media: (slug: string) => media.find((item) => item.slug === slug),
    document: (slug: string) => documents.find((item) => item.slug === slug),
    dataset: (slug: string) => datasets.find((item) => item.slug === slug),
    news: (slug: string) => news.find((item) => item.slug === slug),
    event: (slug: string) => events.find((item) => item.slug === slug),
  },
}

export interface ResolvedResource {
  id: string
  kind: 'simulation' | 'code' | 'media' | 'document' | 'dataset'
  title: string
  category: string
  to: string
}

/**
 * Research areas / projects store cross-cutting `resourceIds` without a type
 * tag, since the id prefix (`sim-`, `code-`, …) already identifies the
 * collection. This resolves each id against every resource collection so
 * callers get a single typed, linkable list regardless of resource kind.
 */
export function resolveResources(ids: string[] | undefined): ResolvedResource[] {
  if (!ids) return []
  const resolved: ResolvedResource[] = []
  for (const id of ids) {
    const sim = simulationIndex.get(id)
    if (sim) {
      resolved.push({ id, kind: 'simulation', title: sim.title, category: sim.category, to: `/resources/simulations/${sim.slug}` })
      continue
    }
    const code = codeIndex.get(id)
    if (code) {
      resolved.push({ id, kind: 'code', title: code.title, category: code.category, to: `/resources/codes/${code.slug}` })
      continue
    }
    const mediaItem = mediaIndex.get(id)
    if (mediaItem) {
      resolved.push({ id, kind: 'media', title: mediaItem.title, category: mediaItem.technique, to: '/resources/media' })
      continue
    }
    const doc = documentIndex.get(id)
    if (doc) {
      resolved.push({ id, kind: 'document', title: doc.title, category: doc.category, to: '/resources/documents' })
      continue
    }
    const dataset = datasetIndex.get(id)
    if (dataset) {
      resolved.push({ id, kind: 'dataset', title: dataset.title, category: dataset.category, to: '/resources/datasets' })
    }
  }
  return resolved
}

/** Projects that reference a given researcher, for the person → projects relationship. */
export function projectsForPerson(personId: string): Project[] {
  return projects.filter((p) => p.piId === personId || p.researcherIds.includes(personId))
}

/** Publications that reference a given researcher, for the person → publications relationship. */
export function publicationsForPerson(personId: string): Publication[] {
  return publications.filter((pub) => pub.authors.some((a) => a.personId === personId))
}
