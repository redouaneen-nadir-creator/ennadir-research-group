import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { researchAreas, projects, publications, news, people, simulations, codes, media } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ResearchAreaCard from '@/components/cards/ResearchAreaCard'
import ProjectCard from '@/components/cards/ProjectCard'
import PublicationCard from '@/components/cards/PublicationCard'
import NewsCard from '@/components/cards/NewsCard'
import { ArrowRightIcon } from '@/components/icons'

export default function Home() {
  const { t } = useLanguage()

  const featuredProjects = projects.filter((p) => p.status === 'active').slice(0, 3)
  const latestPublications = publications.slice(0, 3)
  const latestNews = news.slice(0, 3)
  const resourceCount = simulations.length + codes.length + media.length

  return (
    <>
      <Seo title="" />

      {/* Hero */}
      <section className="relative border-b-2 border-accent-500/70 bg-ink-950 text-white">
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl animate-fadeUp">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              <span className="h-px w-8 bg-accent-500/70" />
              {t('home.heroKicker')}
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl">{t('home.heroTitle')}</h1>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">{t('home.heroSubtitle')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 rounded-sm bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                {t('home.heroCtaResearch')}
                <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                {t('home.heroCtaProjects')}
              </Link>
              <Link
                to="/publications"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                {t('home.heroCtaPublications')}
              </Link>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              [publications.length, t('home.statsPublications')],
              [projects.length, t('home.statsProjects')],
              [people.length, t('home.statsPeople')],
              [resourceCount, t('home.statsResources')],
            ].map(([value, label]) => (
              <div key={label as string}>
                <dt className="font-serif text-3xl font-semibold text-white">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-white/50">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Research Areas */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t('nav.research')}
            title={t('home.areasTitle')}
            subtitle={t('home.areasSubtitle')}
            action={
              <Link to="/research" className="link-underline text-sm font-medium text-brand-600">
                {t('common.viewAll')}
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area) => (
              <ResearchAreaCard key={area.id} area={area} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="bg-ink-900/[0.02] py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t('nav.projects')}
            title={t('home.projectsTitle')}
            subtitle={t('home.projectsSubtitle')}
            action={
              <Link to="/projects" className="link-underline text-sm font-medium text-brand-600">
                {t('common.viewAll')}
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Publications */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t('nav.publications')}
            title={t('home.publicationsTitle')}
            subtitle={t('home.publicationsSubtitle')}
            action={
              <Link to="/publications" className="link-underline text-sm font-medium text-brand-600">
                {t('common.viewAll')}
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPublications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </Container>
      </section>

      {/* Latest News */}
      <section className="bg-ink-900/[0.02] py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker={t('nav.news')}
            title={t('home.newsTitle')}
            action={
              <Link to="/news" className="link-underline text-sm font-medium text-brand-600">
                {t('common.viewAll')}
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Resources teaser */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={t('home.resourcesTitle')} subtitle={t('home.resourcesSubtitle')} />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { to: '/resources/simulations', label: t('resources.cat.simulations'), count: simulations.length },
              { to: '/resources/codes', label: t('resources.cat.codes'), count: codes.length },
              { to: '/resources/media', label: t('resources.cat.media'), count: media.length },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between rounded border border-ink-900/15 bg-white p-6 transition-colors hover:border-brand-400"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-900 group-hover:text-brand-700">{item.label}</p>
                  <p className="mt-1 text-xs text-ink-700/55">{item.count}</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-ink-700/40 group-hover:text-brand-600 rtl:rotate-180" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact / Collaboration */}
      <section className="border-t-2 border-accent-500/70 bg-ink-950 py-16 text-white sm:py-20">
        <Container className="text-center">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.contactTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            {t('home.contactSubtitle')}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-accent-400"
          >
            {t('home.contactCta')}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </Container>
      </section>
    </>
  )
}
