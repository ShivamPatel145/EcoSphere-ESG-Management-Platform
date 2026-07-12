'use client'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2.5">
        <h1 className="text-[20px] font-semibold text-ink">{title}</h1>
        {subtitle && <p className="text-[12.5px] text-faint">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  )
}
