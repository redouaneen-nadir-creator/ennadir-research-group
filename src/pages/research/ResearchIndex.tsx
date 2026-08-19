import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import { researchAreas } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import ResearchAreaCard from '@/components/cards/ResearchAreaCard'
import { ArrowRightIcon } from '@/components/icons'

export default function ResearchIndex() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t('research.title')} description={t('research.subtitle')} />
      <PageHeader kicker={t('nav.research')} title={t('research.title')} subtitle={t('research.subtitle')} />

      <Container className="py-14">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <Link
            to="/research/facilities"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-800 hover:border-brand-300 hover:text-brand-700"
          >
            {t('research.facilitiesTitle')}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <h2 className="mb-6 text-xl font-semibold text-ink-900">{t('research.areasTitle')}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <ResearchAreaCard key={area.id} area={area} />
          ))}
        </div>
      </Container>
    </>
  )
}
