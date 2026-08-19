import { useParams, Navigate, Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup, resolveResources } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { DetailSection, InfoGrid, InfoRow } from '@/components/ui/DetailSection'
import EmptyState from '@/components/ui/EmptyState'
import RelatedLinks from '@/components/ui/RelatedLinks'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import { ExternalLinkIcon } from '@/components/icons'
import { formatDate } from '@/utils/format'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lt, locale } = useLanguage()
  const project = slug ? lookup.bySlug.project(slug) : undefined

  if (!project) return <Navigate to="/projects" replace />

  const pi = lookup.person(project.piId)
  const researchers = lookup.people(project.researcherIds)
  const areas = lookup.researchAreas(project.researchAreaIds)
  const publicationItems = lookup.publications(project.publicationIds)
  const resourceItems = resolveResources([
    ...project.codeIds,
    ...project.simulationIds,
    ...project.datasetIds,
    ...project.documentIds,
    ...project.mediaIds,
  ])

  return (
    <>
      <Seo title={lt(project.name)} description={lt(project.summary)} />
      <PageHeader kicker={project.acronym || t('nav.projects')} title={lt(project.name)} subtitle={lt(project.summary)}>
        <StatusBadge status={project.status} label={t(`common.${project.status}`)} />
      </PageHeader>

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.projects'), to: '/projects' }, { label: lt(project.name) }]} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InfoGrid>
              <InfoRow label={t('common.status')} value={t(`common.${project.status}`)} />
              <InfoRow
                label={t('common.startDate')}
                value={formatDate(project.startDate, locale, { year: 'numeric', month: 'long' })}
              />
              <InfoRow
                label={t('common.endDate')}
                value={project.endDate ? formatDate(project.endDate, locale, { year: 'numeric', month: 'long' }) : '—'}
              />
              <InfoRow
                label={t('common.principalInvestigator')}
                value={pi ? <Link to={`/people/${pi.slug}`} className="text-brand-600 hover:underline">{pi.name}</Link> : '—'}
              />
              <InfoRow label={t('common.funding')} value={project.funding} />
              <InfoRow
                label={t('common.researchArea')}
                value={
                  <span className="flex flex-wrap gap-1.5">
                    {areas.map((a) => (
                      <Badge key={a.id}>{lt(a.title)}</Badge>
                    ))}
                  </span>
                }
              />
            </InfoGrid>

            <DetailSection title={t('research.title')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{project.description}</p>
            </DetailSection>

            <DetailSection title={t('projects.objectives')}>
              <ul className="space-y-2">
                {project.objectives.map((obj) => (
                  <li key={obj} className="flex gap-2.5 text-sm leading-relaxed text-ink-800">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {obj}
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.collaborators.length > 0 && (
              <DetailSection title={t('common.collaborators')}>
                <div className="flex flex-wrap gap-2">
                  {project.collaborators.map((c) => (
                    <Badge key={c}>{c}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}

            {project.externalLinks.length > 0 && (
              <DetailSection title={t('projects.externalLinks')}>
                <ul className="space-y-2">
                  {project.externalLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.researchers')}</h3>
              {researchers.length > 0 ? (
                <RelatedLinks items={researchers.map((p) => ({ to: `/people/${p.slug}`, label: p.name, meta: lt(p.position) }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedPublications')}</h3>
              {publicationItems.length > 0 ? (
                <RelatedLinks
                  items={publicationItems.map((p) => ({ to: `/publications/${p.slug}`, label: p.title, meta: String(p.year) }))}
                />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedResources')}</h3>
              {resourceItems.length > 0 ? (
                <RelatedLinks items={resourceItems.map((r) => ({ to: r.to, label: r.title, meta: r.category }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
