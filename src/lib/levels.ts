import { LEVELS } from '@/db/schema'

export interface LevelInfo {
  level: number
  name: string
  min: number
}

/**
 * Resolve a user's level from their lifetime totalXp using the frozen
 * LEVELS thresholds exported by the schema.
 * 1 Sprout 0–500 · 2 Grower 500–1500 · 3 Steward 1500–3000 · 4 Champion 3000–6000 · 5 Guardian 6000+
 */
export function getLevel(totalXp: number): LevelInfo {
  let current: LevelInfo = LEVELS[0]
  for (const tier of LEVELS) {
    if (totalXp >= tier.min) {
      current = tier
    }
  }
  return current
}
