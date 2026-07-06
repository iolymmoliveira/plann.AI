import { simulationFormSteps } from '@/data/simulation'
import { FormStep } from './FormStep'
import { Progress } from './Progress'

export function SimulationForm() {
  const currentStep = simulationFormSteps[0] // Example: using the first step for demonstration

  return (
    <>
      <Progress currentStep={1} totalSteps={6} />
      <FormStep key={currentStep.id} {...currentStep} />
    </>
  )
}
