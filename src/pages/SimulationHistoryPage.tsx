import { useState } from 'react'

import { SimulationHistoryList } from '@/components/features/SimulationHistory/SimulationHistoryList'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(getAllSimulations)

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((current) => current.filter((simulation) => simulation.id !== id))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />
      {simulations.length > 0 ? (
        <SimulationHistoryList simulations={simulations} onDelete={handleDelete} />
      ) : (
        <div className="bg-card rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)]">
          <p className="font-semibold">Nenhuma simulação salva</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Crie uma simulação para acompanhá-la por aqui.
          </p>
        </div>
      )}
    </main>
  )
}
