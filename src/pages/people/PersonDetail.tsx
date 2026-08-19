import { useParams, Navigate } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup, projectsForPerson, publicationsForPerson } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { DetailSection } from '@/components/ui/DetailSection'
import EmptyState from '@/components/ui/EmptyState'
import RelatedLinks from '@/components/ui/RelatedLinks'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import { MailIcon, ExternalLinkIcon } from '@/components/icons'

export default function PersonDetail() {
  const { slug } = useParams()
  const { t, lt } = useLanguage()
  const person = slug ? lookup.bySlug.person(slug) : undefined

  if (!person) return <Navigate to="/people" replace />

  const personProjects = projectsForPerson(person.id)
  const personPublications = publicationsForPerson(person.id)
  const codeItems = lookup.codes(person.codeIds)
  const simulationItems = lookup.simulations(person.simulationIds)

  const links = [
    person.orcid && { label: 'ORCID', url: person.orcid },
    person.googleScholar && { label: 'Google Scholar', url: person.googleScholar },
    person.linkedin && { label: 'LinkedIn', url: person.linkedin },
    person.personalWebsite && { label: t('people.contact'), url: person.personalWebsite },
  ].filter((l): l is { label: string; url: string } => Boolean(l))

  return (
    <>
      <Seo title={person.name} description={lt(person.position)} />

      <header className="border-b-2 border-accent-500/70 bg-ink-950 text-white">
        <Container className="flex flex-col items-center gap-5 py-14 text-center sm:flex-row sm:items-center sm:text-start">
          <Avatar name={person.name} className="h-24 w-24 shrink-0 text-2xl" />
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">{person.name}</h1>
            <p className="mt-2 text-white/70">{lt(person.position)}</p>
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-300 hover:text-brand-200"
              >
                <MailIcon className="h-4 w-4" />
                {person.email}
              </a>
            )}
          </div>
        </Container>
      </header>

      <Container className="py-14">
        <Breadcrumbs items={[{ label: t('nav.people'), to: '/people' }, { label: person.name }]} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DetailSection title={t('people.biography')}>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{person.biography}</p>
            </DetailSection>

            {person.researchInterests.length > 0 && (
              <DetailSection title={t('people.researchInterests')}>
                <div className="flex flex-wrap gap-2">
                  {person.researchInterests.map((interest) => (
                    <Badge key={interest}>{interest}</Badge>
                  ))}
                </div>
              </DetailSection>
            )}

            {links.length > 0 && (
              <DetailSection title={t('people.links')}>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
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
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedProjects')}</h3>
              {personProjects.length > 0 ? (
                <RelatedLinks items={personProjects.map((p) => ({ to: `/projects/${p.slug}`, label: lt(p.name) }))} />
              ) : (
                <EmptyState message={t('common.noResults')} />
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('common.relatedPublications')}</h3>
              {personPublications.length > 0 ? (
                <RelatedLinks
                  items={personPublications.map((p) => ({
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
              <h3 className="mb-3 text-sm font-semibold text-ink-900">{t('people.software')}</h3>
              {codeItems.length + simulationItems.length > 0 ? (
                <RelatedLinks
                  items={[
                    ...codeItems.map((c) => ({ to: `/resources/codes/${c.slug}`, label: c.title })),
                    ...simulationItems.map((s) => ({ to: `/resources/simulations/${s.slug}`, label: s.title })),
                  ]}
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
