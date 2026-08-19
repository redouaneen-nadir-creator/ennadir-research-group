import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { simulations, codes, media, documents, datasets } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { ArrowRightIcon } from '@/components/icons'

export default function ResourcesIndex() {
  const { t } = useLanguage()

  const cards = [
    { to: '/resources/simulations', label: t('resources.cat.simulations'), count: simulations.length },
    { to: '/resources/codes', label: t('resources.cat.codes'), count: codes.length },
    { to: '/resources/media', label: t('resources.cat.media'), count: media.length },
    { to: '/resources/documents', label: t('resources.cat.documents'), count: documents.length },
    { to: '/resources/datasets', label: t('resources.cat.datasets'), count: datasets.length },
  ]

  return (
    <>
      <Seo title={t('resources.title')} description={t('resources.subtitle')} />
      <PageHeader kicker={t('nav.resources')} title={t('resources.title')} subtitle={t('resources.subtitle')} />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex flex-col justify-between rounded-2xl border border-ink-900/8 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
            >
              <div>
                <h3 className="text-lg font-semibold text-ink-900 group-hover:text-brand-700">{card.label}</h3>
                <p className="mt-1 text-sm text-ink-700/55">{card.count}</p>
              </div>
              <ArrowRightIcon className="mt-6 h-5 w-5 text-ink-700/40 group-hover:text-brand-600 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
