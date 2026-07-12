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
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800' },
  ACTIVE: { bg: 'bg-green-100', text: 'text-green-800' },
  CONFIRMED: { bg: 'bg-green-100', text: 'text-green-800' },
  APPROVED: { bg: 'bg-green-100', text: 'text-green-800' },
  RESOLVED: { bg: 'bg-green-100', text: 'text-green-800' },
  VALIDATED: { bg: 'bg-blue-100', text: 'text-blue-800' },
  NEEDS_REVIEW: { bg: 'bg-red-100', text: 'text-red-800' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-800' },
  UNDER_REVIEW: { bg: 'bg-amber-100', text: 'text-amber-800' },
  PENDING: { bg: 'bg-amber-100', text: 'text-amber-800' },
  ARCHIVED: { bg: 'bg-zinc-100', text: 'text-zinc-800' },
}

export function StatusPill({ status }: { status: string }) {
  const style = statusStyles[status as StatusType] || statusStyles.DRAFT
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {status}
    </span>
  )
}
