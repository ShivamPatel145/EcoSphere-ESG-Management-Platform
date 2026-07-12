'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

interface KpiTileProps {
  label: string
  value: string | number
  delta?: number // positive = up, negative = down
}

export function KpiTile({ label, value, delta }: KpiTileProps) {
  const isPositive = delta !== undefined && delta >= 0

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
    </div>
  )
}
