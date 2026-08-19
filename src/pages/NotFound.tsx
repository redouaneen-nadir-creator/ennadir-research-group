import { Link } from 'react-router-dom'
import { useLanguage } from '@/i18n/LanguageContext'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t('notFound.title')} />
      <Container className="flex flex-col items-center justify-center py-28 text-center">
        <p className="font-serif text-6xl font-semibold text-brand-200">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">{t('notFound.title')}</h1>
        <p className="mt-2 max-w-md text-sm text-ink-700/70">{t('notFound.subtitle')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {t('notFound.cta')}
        </Link>
      </Container>
    </>
  )
}
