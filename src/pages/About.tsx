import { useLanguage } from '@/i18n/LanguageContext'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import { DetailSection } from '@/components/ui/DetailSection'

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t('about.title')} description={t('about.intro')} />
      <PageHeader kicker={t('nav.about')} title={t('about.title')} subtitle={t('about.intro')} />

      <Container className="max-w-3xl py-14">
        <DetailSection title={t('about.missionTitle')}>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{t('about.mission')}</p>
        </DetailSection>
        <DetailSection title={t('about.approachTitle')}>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{t('about.approach')}</p>
        </DetailSection>
        <DetailSection title={t('about.hostTitle')}>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-800">{t('about.host')}</p>
        </DetailSection>
      </Container>
    </>
  )
}
