import { ExternalLink, Trash2 } from 'lucide-react'

import { Button } from '@/components/shared/Button'

interface SimulationActionsProps {
  goalName: string
  onDelete: () => void
  onViewDetails: () => void
}

export function SimulationActions({ goalName, onDelete, onViewDetails }: SimulationActionsProps) {
  return (
    <div className="border-border flex w-full items-center border-t pt-4 sm:w-auto sm:justify-evenly sm:gap-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
      <Button
        aria-label={`Excluir simulação ${goalName}`}
        className="flex-1 justify-center text-red-500 sm:flex-none sm:px-2 sm:py-2"
        variant="ghost"
        icon={Trash2}
        iconClassName="sm:size-6"
        onClick={onDelete}
      />

      <div className="bg-border h-10 w-px sm:hidden" />

      <Button
        className="flex-1 justify-center text-xs sm:flex-none sm:gap-2.5 sm:rounded-2xl sm:border sm:border-border sm:bg-secondary-button sm:px-4 sm:py-2"
        variant="ghost"
        icon={ExternalLink}
        iconClassName="size-6 sm:size-5"
        onClick={onViewDetails}
      >
        Ver detalhes
      </Button>
    </div>
  )
}
