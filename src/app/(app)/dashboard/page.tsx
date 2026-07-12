import { EmptyState } from '@/components/shared/empty-state'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <EmptyState icon="📊" title="Dashboard Coming Soon" description="This module will be built by the team" />
    </div>
  )
}
