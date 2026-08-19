import { useLanguage } from '@/i18n/LanguageContext'
import { people } from '@/data'
import Seo from '@/components/Seo'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import PersonCard from '@/components/cards/PersonCard'
import type { Person } from '@/types'

const CATEGORY_ORDER: { key: Person['category']; labelKey: string }[] = [
  { key: 'pi', labelKey: 'people.cat.pi' },
  { key: 'researcher', labelKey: 'people.cat.researchers' },
  { key: 'postdoc', labelKey: 'people.cat.postdocs' },
  { key: 'phd', labelKey: 'people.cat.phd' },
  { key: 'msc', labelKey: 'people.cat.msc' },
  { key: 'engineer', labelKey: 'people.cat.engineers' },
  { key: 'collaborator', labelKey: 'people.cat.collaborators' },
  { key: 'alumni', labelKey: 'people.cat.alumni' },
]

export default function PeopleIndex() {
  const { t } = useLanguage()

  return (
    <>
      <Seo title={t('people.title')} description={t('people.subtitle')} />
      <PageHeader kicker={t('nav.people')} title={t('people.title')} subtitle={t('people.subtitle')} />

      <Container className="space-y-14 py-14">
        {CATEGORY_ORDER.map(({ key, labelKey }) => {
          const members = people.filter((p) => p.category === key)
          if (members.length === 0) return null
          return (
            <section key={key}>
              <h2 className="mb-6 text-xl font-semibold text-ink-900">{t(labelKey)}</h2>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {members.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </section>
          )
        })}
      </Container>
    </>
  )
}
