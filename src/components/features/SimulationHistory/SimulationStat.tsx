interface SimulationStatProps {
  label: string
  value: string
}

export function SimulationStat({ label, value }: SimulationStatProps) {
  return (
    <div>
      <p className="text-muted-foreground text-xs font-semibold uppercase">{label}</p>
      <p className="mt-1 text-base font-semibold">{value}</p>
    </div>
  )
}
