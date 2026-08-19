import { Link } from 'react-router-dom'
import type { Person } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import Avatar from '@/components/ui/Avatar'

export default function PersonCard({ person }: { person: Person }) {
  const { lt } = useLanguage()

  return (
    <Link
      to={`/people/${person.slug}`}
      className="group flex flex-col items-center rounded border border-ink-900/15 bg-white p-6 text-center transition-colors hover:border-brand-400"
    >
      <Avatar name={person.name} className="h-16 w-16 text-lg" />
      <h3 className="mt-4 text-sm font-semibold text-ink-900 group-hover:text-brand-700">{person.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-700/65">{lt(person.position)}</p>
    </Link>
  )
}
