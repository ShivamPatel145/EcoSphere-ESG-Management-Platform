'use client'

import { useState } from 'react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { Bell, Search, LogOut } from 'lucide-react'
import { getLevel } from '@/lib/levels'

interface TopbarProps {
  title: string
  session: Session | null
}

export function Topbar({ title, session }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false)

  const user = session?.user as any
  const xp = user?.totalXp || 0
  const level = getLevel(xp).level

  const initials = user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>EcoSphere</span>
          <span className="text-gray-400">/</span>
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative text-gray-600 hover:text-gray-900 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-4 text-center text-gray-500 text-sm">
                  No new notifications
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
              <div className="text-xs text-gray-600">
                Level {level} · {xp.toLocaleString()} XP
              </div>
            </div>

            <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-semibold">
              {initials}
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/sign-in' })}
              className="text-gray-600 hover:text-gray-900 transition-all"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
