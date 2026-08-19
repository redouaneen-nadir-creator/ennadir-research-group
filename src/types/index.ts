import type { LocalizedText } from '@/i18n/types'

/**
 * Visibility of a content item. Only `public` items are meant to ship in
 * the GitHub Pages build — see src/utils/visibility.ts. Because GitHub
 * Pages serves the whole repo as static files, true confidentiality still
 * requires keeping non-public records out of this repository entirely;
 * this field only gates what the *app* renders.
 */
export type Visibility = 'public' | 'group' | 'private'

export type ProjectStatus = 'active' | 'completed' | 'planned'

export interface ExternalLink {
  label: string
  url: string
}

export interface ResearchArea {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  description: string
  objectives: string[]
  materials: string[]
  methods: string[]
  devices: string[]
  image?: string
  icon: string
  publicationIds: string[]
  projectIds: string[]
  researcherIds: string[]
  resourceIds: string[]
  visibility: Visibility
}

export interface Facility {
  id: string
  slug: string
  title: LocalizedText
  description: string
  image?: string
  equipment: string[]
  visibility: Visibility
}

export interface Person {
  id: string
  slug: string
  category: 'pi' | 'researcher' | 'postdoc' | 'phd' | 'msc' | 'engineer' | 'collaborator' | 'alumni'
  name: string
  photo?: string
  position: LocalizedText
  biography: string
  researchInterests: string[]
  email?: string
  orcid?: string
  googleScholar?: string
  linkedin?: string
  personalWebsite?: string
  projectIds: string[]
  publicationIds: string[]
  codeIds: string[]
  simulationIds: string[]
  visibility: Visibility
}

export interface Project {
  id: string
  slug: string
  name: LocalizedText
  acronym?: string
  summary: LocalizedText
  description: string
  objectives: string[]
  startDate: string
  endDate?: string
  status: ProjectStatus
  researchAreaIds: string[]
  piId: string
  researcherIds: string[]
  collaborators: string[]
  funding?: string
  publicationIds: string[]
  codeIds: string[]
  simulationIds: string[]
  datasetIds: string[]
  documentIds: string[]
  mediaIds: string[]
  externalLinks: ExternalLink[]
  image?: string
  visibility: Visibility
}

export interface PublicationAuthor {
  name: string
  personId?: string
}

export type PublicationType = 'journal' | 'conference' | 'preprint' | 'book-chapter'

export interface Publication {
  id: string
  slug: string
  title: string
  type: PublicationType
  authors: PublicationAuthor[]
  abstract: string
  journal: string
  year: number
  doi?: string
  volume?: string
  pages?: string
  keywords: string[]
  researchAreaIds: string[]
  projectIds: string[]
  pdfUrl?: string
  supplementaryUrl?: string
  datasetIds: string[]
  codeIds: string[]
  figureIds: string[]
  externalLinks: ExternalLink[]
  visibility: Visibility
}

export type SimulationCategory =
  | 'Silvaco ATLAS'
  | 'SCAPS-1D'
  | 'COMSOL'
  | 'Python'
  | 'MATLAB'
  | 'FEM'
  | 'Monte Carlo'
  | 'Machine Learning'
  | 'TCAD'

export interface Simulation {
  id: string
  slug: string
  title: string
  description: string
  category: SimulationCategory
  software: string
  version?: string
  material?: string
  device?: string
  authorPersonIds: string[]
  projectIds: string[]
  publicationIds: string[]
  inputFilesNote?: string
  outputFilesNote?: string
  figureIds: string[]
  codeUrl?: string
  documentationUrl?: string
  downloadUrl?: string
  tags: string[]
  visibility: Visibility
}

export type CodeCategory =
  | 'Python'
  | 'MATLAB'
  | 'TCAD'
  | 'FEM'
  | 'Monte Carlo'
  | 'Machine Learning'
  | 'Data Processing'

export interface CodeEntry {
  id: string
  slug: string
  title: string
  description: string
  category: CodeCategory
  language: string
  version?: string
  authorPersonIds: string[]
  projectIds: string[]
  publicationIds: string[]
  repositoryUrl: string
  documentationUrl?: string
  license?: string
  tags: string[]
  visibility: Visibility
}

export type MediaTechnique =
  | 'SEM'
  | 'TEM'
  | 'AFM'
  | 'XRD'
  | 'Raman'
  | 'PL'
  | 'Device Image'
  | 'Schematic'
  | 'Figure'
  | 'Graphical Abstract'
  | 'Video'

export interface MediaItem {
  id: string
  slug: string
  title: string
  description: string
  technique: MediaTechnique
  authorPersonIds: string[]
  material?: string
  projectIds: string[]
  publicationIds: string[]
  imageUrl: string
  tags: string[]
  copyright?: string
  visibility: Visibility
}

export type DocumentCategory =
  | 'Report'
  | 'Deliverable'
  | 'Proposal'
  | 'Technical Report'
  | 'Presentation'
  | 'Poster'
  | 'Other'

export interface DocumentItem {
  id: string
  slug: string
  title: string
  description: string
  category: DocumentCategory
  date: string
  authorPersonIds: string[]
  projectIds: string[]
  publicationIds: string[]
  fileUrl?: string
  externalUrl?: string
  tags: string[]
  visibility: Visibility
}

export type DatasetCategory = 'Dataset' | 'Model' | 'Experimental Data' | 'External Link'

export interface DatasetItem {
  id: string
  slug: string
  title: string
  description: string
  category: DatasetCategory
  authorPersonIds: string[]
  projectIds: string[]
  publicationIds: string[]
  researchAreaIds: string[]
  downloadUrl?: string
  externalUrl?: string
  format?: string
  size?: string
  tags: string[]
  visibility: Visibility
}

export type NewsCategory =
  | 'publications'
  | 'conferences'
  | 'awards'
  | 'members'
  | 'funding'
  | 'collaborations'

export interface NewsItem {
  id: string
  slug: string
  title: string
  date: string
  category: NewsCategory
  description: string
  image?: string
  externalUrl?: string
  projectId?: string
  visibility: Visibility
}

export type EventCategory = 'conferences' | 'seminars' | 'workshops' | 'meetings' | 'deadlines'

export interface EventItem {
  id: string
  slug: string
  title: string
  date: string
  endDate?: string
  category: EventCategory
  location?: string
  description: string
  image?: string
  externalUrl?: string
  projectId?: string
  visibility: Visibility
}
