import { useParams, Navigate, Link } from 'react-router-dom'
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

export default function PublicationDetail() {
  const { slug } = useParams()
  const { t, lt } = useLanguage()
  const pub = slug ? lookup.bySlug.publication(slug) : undefined

  if (!pub) return <Navigate to="/publications" replace />

  const areas = lookup.researchAreas(pub.researchAreaIds)
  const projectItems = lookup.projects(pub.projectIds)
  const codeItems = lookup.codes(pub.codeIds)
  const datasetItems = lookup.datasets(pub.datasetIds)

  return (
    <>
      <Seo title={pub.title} description={pub.abstract} />
      <PageHeader kicker={`${pub.journal} · ${pub.year}`} title={pub.title} />

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.publications'), to: '/publications' }, { label: pub.title }]} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="mb-6 text-sm text-ink-700/75">
              {pub.authors.map((a, i) => (
                <span key={a.name}>
                  {a.personId ? (
                    <Link
                      to={`/people/${lookup.person(a.personId)?.slug}`}
                      className="font-medium text-ink-900 hover:text-brand-600"
                    >
                      {a.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink-900">{a.name}</span>
                  )}
                  {i < pub.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            <InfoGrid>
              <InfoRow label={t('common.journal')} value={pub.journal} />
              <InfoRow label={t('common.year')} value={pub.year} />
              <InfoRow label={t('publications.volume')} value={pub.volume} />
              <InfoRow label={t('publications.pages')} value={pub.pages} />
              <InfoRow
                label={t('common.doi')}
                value={
                  pub.doi ? (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                    >
                      {pub.doi}
                      <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    t('common.addPlaceholder')
                  )
                }
              />
              <InfoRow label={t('research.title')} value={areas.map((a) => lt(a.title)).join(', ')} />
            </InfoGrid>

            <DetailSection title={t('publications.abstract')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{pub.abstract}</p>
            </DetailSection>

            {pub.keywords.length > 0 && (
              <DetailSection title={t('common.keywords')}>
                <div className="flex flex-wrap gap-2">
                  {pub.keywords.map((k) => (
                    <Badge key={k}>{k}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}

            <DetailSection title={t('nav.resources')}>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                {pub.pdfUrl ? (
                  <a href={pub.pdfUrl} className="text-brand-600 hover:underline">
                    {t('common.pdf')}
                  </a>
                ) : (
                  <span className="text-ink-700/40">{t('common.pdf')}: {t('common.addPlaceholder')}</span>
                )}
                {pub.supplementaryUrl ? (
                  <a href={pub.supplementaryUrl} className="text-brand-600 hover:underline">
                    {t('common.supplementary')}
                  </a>
                ) : null}
              </div>
            </DetailSection>
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedProjects')}</h3>
              {projectItems.length > 0 ? (
                <RelatedLinks items={projectItems.map((p) => ({ to: `/projects/${p.slug}`, label: lt(p.name) }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.code')}</h3>
              {codeItems.length > 0 ? (
                <RelatedLinks items={codeItems.map((c) => ({ to: `/resources/codes/${c.slug}`, label: c.title }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.dataset')}</h3>
              {datasetItems.length > 0 ? (
                <RelatedLinks items={datasetItems.map((d) => ({ to: '/resources/datasets', label: d.title }))} />
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
