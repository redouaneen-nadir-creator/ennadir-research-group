import { useParams, Navigate } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup, resolveResources } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { DetailSection } from '@/components/ui/DetailSection'
import EmptyState from '@/components/ui/EmptyState'
import RelatedLinks from '@/components/ui/RelatedLinks'
import Badge from '@/components/ui/Badge'
import { AreaIcon } from '@/components/icons'

export default function ResearchAreaDetail() {
  const { slug } = useParams()
  const { t, lt } = useLanguage()
  const area = slug ? lookup.bySlug.researchArea(slug) : undefined

  if (!area) return <Navigate to="/research" replace />

  const projectItems = lookup.projects(area.projectIds)
  const publicationItems = lookup.publications(area.publicationIds)
  const researcherItems = lookup.people(area.researcherIds)
  const resourceItems = resolveResources(area.resourceIds)

  return (
    <>
      <Seo title={lt(area.title)} description={lt(area.summary)} />
      <PageHeader kicker={t('nav.research')} title={lt(area.title)} subtitle={lt(area.summary)}>
        <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white">
          <AreaIcon name={area.icon} className="h-6 w-6" />
        </span>
      </PageHeader>

      <Container className="py-14">
        <Breadcrumbs
          items={[
            { label: t('nav.research'), to: '/research' },
            { label: lt(area.title) },
          ]}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DetailSection title={t('research.title')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{area.description}</p>
            </DetailSection>

            <DetailSection title={t('research.objectives')}>
              <ul className="space-y-2">
                {area.objectives.map((obj) => (
                  <li key={obj} className="flex gap-2.5 text-sm leading-relaxed text-ink-800">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {obj}
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection title={t('research.materials')}>
              <div className="flex flex-wrap gap-2">
                {area.materials.map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}
              </div>
            </DetailSection>

            <DetailSection title={t('research.methods')}>
              <div className="flex flex-wrap gap-2">
                {area.methods.map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}
              </div>
            </DetailSection>

            {area.devices.length > 0 && (
              <DetailSection title={t('research.devices')}>
                <div className="flex flex-wrap gap-2">
                  {area.devices.map((m) => (
                    <Badge key={m}>{m}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedProjects')}</h3>
              {projectItems.length > 0 ? (
                <RelatedLinks
                  items={projectItems.map((p) => ({ to: `/projects/${p.slug}`, label: lt(p.name) }))}
                />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedPublications')}</h3>
              {publicationItems.length > 0 ? (
                <RelatedLinks
                  items={publicationItems.map((p) => ({
                    to: `/publications/${p.slug}`,
                    label: p.title,
                    meta: String(p.year),
                  }))}
                />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedPeople')}</h3>
              {researcherItems.length > 0 ? (
                <RelatedLinks
                  items={researcherItems.map((p) => ({ to: `/people/${p.slug}`, label: p.name }))}
                />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('research.relatedResources')}</h3>
              {resourceItems.length > 0 ? (
                <RelatedLinks
                  items={resourceItems.map((r) => ({ to: r.to, label: r.title, meta: r.category }))}
                />
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
