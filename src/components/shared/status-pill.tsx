'use client'

type StatusType =
  | 'DRAFT'
  | 'ACTIVE'
  | 'CONFIRMED'
  | 'APPROVED'
  | 'RESOLVED'
  | 'VALIDATED'
  | 'NEEDS_REVIEW'
  | 'REJECTED'
  | 'UNDER_REVIEW'
  | 'PENDING'
  | 'ARCHIVED'

const statusStyles: Record<StatusType, { bg: string; text: string }> = {
  DRAFT: { bg: 'bg-surface-2', text: 'text-ink-2' },
  ACTIVE: { bg: 'bg-pill-green-bg', text: 'text-pill-green-fg' },
  CONFIRMED: { bg: 'bg-pill-green-bg', text: 'text-pill-green-fg' },
  APPROVED: { bg: 'bg-pill-green-bg', text: 'text-pill-green-fg' },
  RESOLVED: { bg: 'bg-pill-green-bg', text: 'text-pill-green-fg' },
  VALIDATED: { bg: 'bg-pill-blue-bg', text: 'text-pill-blue-fg' },
  NEEDS_REVIEW: { bg: 'bg-pill-red-bg', text: 'text-pill-red-fg' },
  REJECTED: { bg: 'bg-pill-red-bg', text: 'text-pill-red-fg' },
  UNDER_REVIEW: { bg: 'bg-pill-amber-bg', text: 'text-pill-amber-fg' },
  PENDING: { bg: 'bg-pill-amber-bg', text: 'text-pill-amber-fg' },
  ARCHIVED: { bg: 'bg-surface-2', text: 'text-faint' },
}

export function StatusPill({ status }: { status: string }) {
  const style = statusStyles[status as StatusType] || statusStyles.DRAFT
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${style.bg} ${style.text}`}>
      {status}
    </span>
  )
}
