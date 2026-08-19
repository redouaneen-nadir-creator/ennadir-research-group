import { useLanguage } from '@/i18n/LanguageContext'
import { facilities } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import Badge from '@/components/ui/Badge'

export default function Facilities() {
  const { t, lt } = useLanguage()

  return (
    <>
      <Seo title={t('research.facilitiesTitle')} />
      <PageHeader kicker={t('nav.research')} title={t('research.facilitiesTitle')} subtitle={t('research.infrastructureTitle')} />

      <Container className="py-14">
        <Breadcrumbs
          items={[
            { label: t('nav.research'), to: '/research' },
            { label: t('research.facilitiesTitle') },
          ]}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white"
            >
              <PlaceholderImage label={lt(facility.title)} className="h-40 w-full" />
              <div className="p-6">
                <h3 className="text-base font-semibold text-ink-900">{lt(facility.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700/75">{facility.description}</p>
                {facility.equipment.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {facility.equipment.map((eq) => (
                      <Badge key={eq}>{eq}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
