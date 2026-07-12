'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Leaf,
  BarChart3,
  Users,
  FileText,
  CheckSquare,
  ShieldAlert,
  Trophy,
  LineChart,
  Settings,
} from 'lucide-react'

const navGroups = [
  {
    title: 'Navigation',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Environmental',
    items: [
      { label: 'Emission Factors', href: '/emission-factors', icon: Leaf },
      { label: 'Product ESG Profiles', href: '/product-profiles', icon: BarChart3 },
      { label: 'Carbon Transactions', href: '/carbon-transactions', icon: Leaf },
      { label: 'Environmental Goals', href: '/environmental-goals', icon: LineChart },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'CSR Activities', href: '/csr-activities', icon: Users },
      { label: 'Employee Participation', href: '/participation', icon: Users },
      { label: 'Diversity', href: '/diversity', icon: Users },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Policies', href: '/policies', icon: FileText },
      { label: 'Acknowledgements', href: '/acknowledgements', icon: CheckSquare },
      { label: 'Audits', href: '/audits', icon: ShieldAlert },
      { label: 'Compliance Issues', href: '/compliance-issues', icon: ShieldAlert },
    ],
  },
  {
    title: 'Gamification',
    items: [
      { label: 'Challenges', href: '/challenges', icon: Trophy },
      { label: 'Participation', href: '/challenge-participation', icon: Trophy },
      { label: 'Badges', href: '/badges', icon: Trophy },
      { label: 'Rewards', href: '/rewards', icon: Trophy },
      { label: 'Leaderboard', href: '/leaderboard', icon: LineChart },
    ],
  },
  {
    title: 'Reports',
    items: [
      { label: 'Environmental', href: '/reports/environmental', icon: LineChart },
      { label: 'Social', href: '/reports/social', icon: LineChart },
      { label: 'Governance', href: '/reports/governance', icon: LineChart },
      { label: 'ESG Summary', href: '/reports/summary', icon: LineChart },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Departments', href: '/departments', icon: Settings },
      { label: 'Categories', href: '/categories', icon: Settings },
      { label: 'ESG Configuration', href: '/esg-config', icon: Settings },
      { label: 'Notifications', href: '/notifications', icon: Settings },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brand-primary">EcoSphere</h1>
      </div>

      <nav className="space-y-8 px-3 pb-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase px-4 mb-3">{group.title}</h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                        isActive
                          ? 'bg-brand-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
