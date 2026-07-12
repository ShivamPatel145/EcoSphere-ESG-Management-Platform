import { EmptyState } from '@/components/shared/empty-state'

export default function () {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Rewards</h1>
      <EmptyState icon="📊" title="Rewards Coming Soon" />
    </div>
  )
}
