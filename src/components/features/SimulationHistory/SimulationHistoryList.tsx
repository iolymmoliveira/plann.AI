import type { SimulationRecord } from '@/data/simulation'
import { SimulationHistoryItem } from './SimulationHistoryItem'

interface SimulationHistoryListProps {
  simulations: SimulationRecord[]
  onDelete: (id: string) => void
}

export function SimulationHistoryList({ simulations, onDelete }: SimulationHistoryListProps) {
  return (
    <div className="flex flex-col gap-4">
      {simulations.map((simulation) => (
        <SimulationHistoryItem key={simulation.id} simulation={simulation} onDelete={onDelete} />
      ))}
    </div>
  )
}