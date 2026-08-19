import type { Simulation } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import ResourceCardShell from './ResourceCardShell'

export default function SimulationCard({ simulation }: { simulation: Simulation }) {
  const { t } = useLanguage()
  const meta = [simulation.software, simulation.material, simulation.device].filter(Boolean).join(' · ')

  return (
    <ResourceCardShell
      to={`/resources/simulations/${simulation.slug}`}
      category={simulation.category}
      title={simulation.title}
      description={simulation.description}
      meta={meta || t('common.addPlaceholder')}
      tags={simulation.tags}
    />
  )
}
