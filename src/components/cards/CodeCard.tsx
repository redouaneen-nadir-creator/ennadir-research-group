import type { CodeEntry } from '@/types'
import ResourceCardShell from './ResourceCardShell'

export default function CodeCard({ code }: { code: CodeEntry }) {
  const meta = [code.language, code.license].filter(Boolean).join(' · ')

  return (
    <ResourceCardShell
      to={`/resources/codes/${code.slug}`}
      category={code.category}
      title={code.title}
      description={code.description}
      meta={meta}
      tags={code.tags}
    />
  )
}
