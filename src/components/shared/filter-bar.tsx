'use client'

import { Search } from 'lucide-react'

interface FilterBarProps {
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  searchSlot?: React.ReactNode
  selectSlot?: React.ReactNode
}

export function FilterBar({
  searchPlaceholder = 'Search...',
  onSearchChange,
  searchSlot,
  selectSlot,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2.5">
      {searchSlot || (
        <div className="flex h-[34px] flex-1 items-center gap-2 rounded-[7px] border border-line bg-surface px-2.5">
          <Search className="h-4 w-4 text-faint" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-faint"
          />
        </div>
      )}
      {selectSlot}
    </div>
  )
}
