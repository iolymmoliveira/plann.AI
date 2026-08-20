import type { SimulationFormData, SimulationRecord } from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = { ...formData, id, createdAt: new Date().toISOString() }
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, record]))

    return id
  }

  const getAllSimulations = (): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) return []

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.toSorted((first, second) => {
      if (!first.createdAt || !second.createdAt) return 0
      return second.createdAt.localeCompare(first.createdAt)
    })
  }

  const getFormData = (id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) return null

    const savedData = JSON.parse(storage) as SimulationRecord[]
    return savedData.find((item) => item.id === id) || null
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []
    const updated = savedData.map((record) => (record.id === id ? { ...data } : record))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  const deleteSimulation = (id: string) => {
    const savedData = getAllSimulations()
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(savedData.filter((record) => record.id !== id)),
    )
  }

  return { saveFormData, getFormData, getAllSimulations, updateSimulation, deleteSimulation }
}
