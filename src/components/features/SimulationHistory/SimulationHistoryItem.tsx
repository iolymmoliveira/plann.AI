import { GoalIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

import { SimulationActions } from './SimulationActions'
import { SimulationStat } from './SimulationStat'

interface SimulationHistoryItemProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

const formatCurrency = (value: string) => `R$ ${value}`

const formatDate = (value?: string) => {
  if (!value) return 'Data não informada'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}

export function SimulationHistoryItem({ simulation, onDelete }: SimulationHistoryItemProps) {
  const navigate = useNavigate()
  const monthlySavings = calcMonthlySavings(simulation)

  return (
    <article className="bg-card grid gap-6 rounded-[22px] p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] md:grid-cols-[auto_minmax(120px,1.2fr)_repeat(3,minmax(100px,1fr))_auto] md:items-center md:gap-6 ">
      <div className="bg-bg-icon text-primary flex h-10 w-10 items-center justify-center rounded-[10px]">
        <GoalIcon />
      </div>

      <div>
        <h2 className="text-base font-semibold">{simulation.goalName}</h2>
        <p className="text-muted-foreground mt-0.5 text-sm font-normal">
          {formatDate(simulation.createdAt)}
        </p>
      </div>

      <SimulationStat label="Custo da meta" value={formatCurrency(simulation.goalAmount)} />

      <SimulationStat label="Prazo" value={`${simulation.goalDeadline} meses`} />

      <SimulationStat
        label="Economia mensal"
        value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
      />

      <SimulationActions
        goalName={simulation.goalName}
        onDelete={() => onDelete(simulation.id)}
        onViewDetails={() => void navigate(`/resultado/${simulation.id}`)}
      />
    </article>
  )
}
