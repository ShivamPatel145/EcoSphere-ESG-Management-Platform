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
    <div className="flex gap-3 items-center">
      {searchSlot || (
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>
      )}
      {selectSlot}
    </div>
  )
}
