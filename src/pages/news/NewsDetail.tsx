import { useParams, Navigate, Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { lookup } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Badge from '@/components/ui/Badge'
import { ExternalLinkIcon } from '@/components/icons'
import { formatDate } from '@/utils/format'

export default function NewsDetail() {
  const { slug } = useParams()
  const { t, lt, locale } = useLanguage()
  const item = slug ? lookup.bySlug.news(slug) : undefined

  if (!item) return <Navigate to="/news" replace />

  const project = item.projectId ? lookup.project(item.projectId) : undefined

  return (
    <>
      <Seo title={item.title} description={item.description} />
      <PageHeader kicker={formatDate(item.date, locale)} title={item.title} />

      <Container className="max-w-3xl py-14">
        <Breadcrumbs items={[{ label: t('nav.news'), to: '/news' }, { label: item.title }]} />

        <Badge tone="brand">{t(`news.cat.${item.category}`)}</Badge>
        <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{item.description}</p>

        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            {t('common.externalLink')}
          </a>
        )}

        {project && (
          <div className="mt-10 rounded-xl border border-ink-900/8 bg-ink-900/[0.02] p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-700/50">{t('common.project')}</p>
            <Link to={`/projects/${project.slug}`} className="text-sm font-medium text-brand-600 hover:underline">
              {lt(project.name)}
            </Link>
          </div>
        )}
      </Container>
    </>
  )
}
