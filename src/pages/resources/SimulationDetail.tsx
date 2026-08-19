import { useParams, Navigate } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { DetailSection, InfoGrid, InfoRow } from '@/components/ui/DetailSection'
import EmptyState from '@/components/ui/EmptyState'
import RelatedLinks from '@/components/ui/RelatedLinks'
import Badge from '@/components/ui/Badge'
import { DownloadIcon, ExternalLinkIcon } from '@/components/icons'

export default function SimulationDetail() {
  const { slug } = useParams()
  const { t, lt } = useLanguage()
  const sim = slug ? lookup.bySlug.simulation(slug) : undefined

  if (!sim) return <Navigate to="/resources/simulations" replace />

  const authors = lookup.people(sim.authorPersonIds)
  const projectItems = lookup.projects(sim.projectIds)
  const publicationItems = lookup.publications(sim.publicationIds)

  return (
    <>
      <Seo title={sim.title} description={sim.description} />
      <PageHeader kicker={sim.category} title={sim.title} />

      <Container className="py-14">
        <Breadcrumbs
          items={[
            { label: t('nav.resources'), to: '/resources' },
            { label: t('simulations.title'), to: '/resources/simulations' },
            { label: sim.title },
          ]}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InfoGrid>
              <InfoRow label={t('simulations.software')} value={sim.software} />
              <InfoRow label={t('simulations.version')} value={sim.version} />
              <InfoRow label={t('simulations.material')} value={sim.material} />
              <InfoRow label={t('simulations.device')} value={sim.device} />
            </InfoGrid>

            <DetailSection title={t('research.title')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{sim.description}</p>
            </DetailSection>

            <DetailSection title={t('simulations.inputFiles')}>
              <p className="text-sm text-ink-700/70">{sim.inputFilesNote || t('common.addPlaceholder')}</p>
            </DetailSection>

            <DetailSection title={t('simulations.outputFiles')}>
              <p className="text-sm text-ink-700/70">{sim.outputFilesNote || t('common.addPlaceholder')}</p>
            </DetailSection>

            {sim.tags.length > 0 && (
              <DetailSection title={t('common.keywords')}>
                <div className="flex flex-wrap gap-2">
                  {sim.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}

            <DetailSection title={t('common.download')}>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                {sim.downloadUrl ? (
                  <a href={sim.downloadUrl} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline">
                    <DownloadIcon className="h-4 w-4" />
                    {t('common.download')}
                  </a>
                ) : (
                  <span className="text-ink-700/40">{t('common.addPlaceholder')}</span>
                )}
                {sim.codeUrl && (
                  <a href={sim.codeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-brand-600 hover:underline">
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t('common.code')}
                  </a>
                )}
                {sim.documentationUrl && (
                  <a
                    href={sim.documentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-600 hover:underline"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t('simulations.documentation')}
                  </a>
                )}
              </div>
            </DetailSection>
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.author')}</h3>
              {authors.length > 0 ? (
                <RelatedLinks items={authors.map((p) => ({ to: `/people/${p.slug}`, label: p.name }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedProjects')}</h3>
              {projectItems.length > 0 ? (
                <RelatedLinks items={projectItems.map((p) => ({ to: `/projects/${p.slug}`, label: p.acronym || lt(p.name) }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedPublications')}</h3>
              {publicationItems.length > 0 ? (
                <RelatedLinks items={publicationItems.map((p) => ({ to: `/publications/${p.slug}`, label: p.title }))} />
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
