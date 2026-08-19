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
import { ExternalLinkIcon } from '@/components/icons'

export default function CodeDetail() {
  const { slug } = useParams()
  const { t, lt } = useLanguage()
  const code = slug ? lookup.bySlug.code(slug) : undefined

  if (!code) return <Navigate to="/resources/codes" replace />

  const authors = lookup.people(code.authorPersonIds)
  const projectItems = lookup.projects(code.projectIds)
  const publicationItems = lookup.publications(code.publicationIds)

  return (
    <>
      <Seo title={code.title} description={code.description} />
      <PageHeader kicker={code.category} title={code.title} />

      <Container className="py-14">
        <Breadcrumbs
          items={[
            { label: t('nav.resources'), to: '/resources' },
            { label: t('codes.title'), to: '/resources/codes' },
            { label: code.title },
          ]}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InfoGrid>
              <InfoRow label={t('codes.language')} value={code.language} />
              <InfoRow label={t('simulations.version')} value={code.version} />
              <InfoRow label={t('codes.license')} value={code.license} />
            </InfoGrid>

            <DetailSection title={t('research.title')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{code.description}</p>
            </DetailSection>

            {code.tags.length > 0 && (
              <DetailSection title={t('common.keywords')}>
                <div className="flex flex-wrap gap-2">
                  {code.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}

            <DetailSection title={t('codes.repository')}>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <a
                  href={code.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-600 hover:underline"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  GitHub
                </a>
                {code.documentationUrl && (
                  <a
                    href={code.documentationUrl}
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
