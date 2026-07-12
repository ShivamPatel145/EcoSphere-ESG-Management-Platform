'use client'

type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

const styles: Record<Severity, string> = {
  LOW: 'bg-surface-2 text-ink-2',
  MEDIUM: 'bg-pill-amber-bg text-pill-amber-fg',
  HIGH: 'bg-pill-amber-bg text-pill-amber-fg',
  CRITICAL: 'bg-pill-red-bg text-pill-red-fg',
}

export function SeverityPill({ severity }: { severity: string }) {
  const cls = styles[severity as Severity] || styles.MEDIUM
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${cls}`}>
      {severity}
    </span>
  )
}
