'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { canViewRoute } from '@/lib/route-access'
import type { Role } from '@/lib/roles'

/**
 * Blocks direct navigation to a page the current role may not view (e.g. an
 * Employee typing /users into the address bar) by bouncing them to the
 * dashboard. Pairs with the sidebar filtering so links AND URLs are gated.
 * Server routes still enforce their own 403s on any write.
 */
export function RouteGuard({ role }: { role: Role }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname && !canViewRoute(role, pathname)) {
      router.replace('/dashboard')
    }
  }, [pathname, role, router])

  return null
}
