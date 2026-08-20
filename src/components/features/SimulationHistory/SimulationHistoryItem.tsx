import { ExternalLink, GoalIcon, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/shared/Button'
import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

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
    <article className="bg-card grid gap-6 rounded-[22px] p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:grid-cols-[auto_minmax(120px,1.2fr)_repeat(3,minmax(100px,1fr))_auto] sm:items-center sm:gap-6 ">
      <div className="bg-bg-icon text-primary flex h-10 w-10 items-center justify-center rounded-[10px]">
        <GoalIcon />
      </div>

      <div>
        <h2 className="text-base font-semibold">{simulation.goalName}</h2>
        <p className="text-muted-foreground mt-0.5 text-sm font-normal">
          {formatDate(simulation.createdAt)}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase">Custo da meta</p>
        <p className="mt-1 text-base font-semibold">{formatCurrency(simulation.goalAmount)}</p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase">Prazo</p>
        <p className="mt-1 text-base font-semibold">{simulation.goalDeadline} meses</p>
      </div>

      <div>
        <p className="text-muted-foreground text-xs font-semibold uppercase">Economia mensal</p>
        <p className="mt-1 text-base font-semibold">
          R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Ações - Mobile */}
      <div className="border-border flex w-full items-center border-t pt-4 sm:hidden">
        <Button
          aria-label={`Excluir simulação ${simulation.goalName}`}
          className="flex-1 justify-center text-red-500"
          variant="ghost"
          icon={Trash2}
          onClick={() => onDelete(simulation.id)}
        />

        <div className="bg-border h-10 w-px" />

        <Button
          className="flex-1 justify-center text-xs"
          variant="ghost"
          icon={ExternalLink}
          iconClassName="size-6"
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
        >
          Ver detalhes
        </Button>
      </div>

      {/* Ações - Desktop */}
      <div className="border-border hidden items-center justify-evenly gap-3 border-l pl-5 sm:flex">
        <Button
          aria-label={`Excluir simulação ${simulation.goalName}`}
          className="px-2 py-2 text-red-500"
          variant="ghost"
          icon={Trash2}
          iconClassName="size-6"
          onClick={() => onDelete(simulation.id)}
        />

        <Button
          className="gap-2.5 rounded-2xl px-4 py-2 text-xs"
          variant="secondary"
          icon={ExternalLink}
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  )
}
