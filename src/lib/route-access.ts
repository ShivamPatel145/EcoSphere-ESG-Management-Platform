import type { Role } from '@/lib/roles'

// =============================================================
// Route-level access control (single source of truth)
// Maps each app route to the roles allowed to VIEW it. Used by both
// the sidebar (to hide links) and the (app) layout (to block direct
// navigation) so the two never drift. This gates page *visibility*;
// the server permission matrix (permissions.ts) still independently
// guards every write action with a 403.
// =============================================================

const ALL: Role[] = ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE']

// Route prefix -> roles that may open it. Longest matching prefix wins,
// so '/reports/summary' is covered by the '/reports' entry.
const ROUTE_ROLES: Record<string, Role[]> = {
  // Everyone
  '/dashboard': ALL,
  '/leaderboard': ALL,
  '/notifications': ALL,
  '/reports': ALL, // Environmental / Social / Governance / ESG Summary

  // Environmental — ESG owns the pillar; everyone can view carbon they log
  '/carbon-transactions': ['ADMIN', 'ESG_MANAGER', 'EMPLOYEE'],
  '/emission-factors': ['ADMIN', 'ESG_MANAGER'],
  '/product-profiles': ['ADMIN', 'ESG_MANAGER'],
  '/environmental-goals': ['ADMIN', 'ESG_MANAGER'],

  // Social — HR owns CSR; employees take part
  '/csr-activities': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
  '/participation': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
  '/diversity': ['ADMIN', 'HR_MANAGER', 'ESG_MANAGER'],

  // Governance — compliance & audit functions; employees acknowledge policies
  '/policies': ['ADMIN', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
  '/acknowledgements': ['ADMIN', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
  '/audits': ['ADMIN', 'AUDITOR'],
  '/compliance-issues': ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'],

  // Gamification — HR runs challenges; everyone plays
  '/challenges': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
  '/challenge-participation': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
  '/badges': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
  '/rewards': ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],

  // Settings / configuration — admin & ESG only (users is admin-only)
  '/users': ['ADMIN'],
  '/departments': ['ADMIN', 'ESG_MANAGER'],
  '/categories': ['ADMIN', 'ESG_MANAGER'],
  '/esg-config': ['ADMIN', 'ESG_MANAGER'],
}

/** Roles allowed to view a given pathname (longest-prefix match). */
export function allowedRolesFor(pathname: string): Role[] {
  let best = ''
  for (const prefix of Object.keys(ROUTE_ROLES)) {
    if ((pathname === prefix || pathname.startsWith(prefix + '/')) && prefix.length > best.length) {
      best = prefix
    }
  }
  return best ? ROUTE_ROLES[best] : ALL // unknown routes default to open
}

/** Whether a role may view a route. */
export function canViewRoute(role: Role, pathname: string): boolean {
  return allowedRolesFor(pathname).includes(role)
}
