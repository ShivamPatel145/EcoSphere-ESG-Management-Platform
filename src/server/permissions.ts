import { Session } from 'next-auth'

type Role = 'ADMIN' | 'ESG_MANAGER' | 'HR_MANAGER' | 'AUDITOR' | 'COMPLIANCE_OFFICER' | 'EMPLOYEE'
type Entity =
  | 'department'
  | 'category'
  | 'emissionFactor'
  | 'productProfile'
  | 'goal'
  | 'carbon'
  | 'csrActivity'
  | 'participation'
  | 'policy'
  | 'acknowledgement'
  | 'audit'
  | 'complianceIssue'
  | 'challenge'
  | 'challengeParticipation'
  | 'badge'
  | 'reward'
  | 'notification'
  | 'esgConfig'

type Action = 'create' | 'read' | 'update' | 'delete' | 'approve'

const permissionMatrix: Record<Entity, Record<Action, Role[]>> = {
  department: {
    create: ['ADMIN'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
  category: {
    create: ['ADMIN'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
  emissionFactor: {
    create: ['ADMIN'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
  productProfile: {
    create: ['ADMIN', 'ESG_MANAGER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'ESG_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'ESG_MANAGER'],
  },
  goal: {
    create: ['ADMIN', 'ESG_MANAGER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'ESG_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'ESG_MANAGER'],
  },
  carbon: {
    create: ['ADMIN', 'ESG_MANAGER', 'EMPLOYEE'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'ESG_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'ESG_MANAGER'],
  },
  csrActivity: {
    create: ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'HR_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'HR_MANAGER'],
  },
  participation: {
    create: ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'HR_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'HR_MANAGER'],
  },
  policy: {
    create: ['ADMIN', 'COMPLIANCE_OFFICER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'COMPLIANCE_OFFICER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'COMPLIANCE_OFFICER'],
  },
  acknowledgement: {
    create: ['ADMIN', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'COMPLIANCE_OFFICER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'COMPLIANCE_OFFICER'],
  },
  audit: {
    create: ['ADMIN', 'AUDITOR'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'AUDITOR'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'AUDITOR'],
  },
  complianceIssue: {
    create: ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'COMPLIANCE_OFFICER'],
  },
  challenge: {
    create: ['ADMIN', 'HR_MANAGER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'HR_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'HR_MANAGER'],
  },
  challengeParticipation: {
    create: ['ADMIN', 'HR_MANAGER', 'EMPLOYEE'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'HR_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'HR_MANAGER'],
  },
  badge: {
    create: ['ADMIN'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
  reward: {
    create: ['ADMIN', 'HR_MANAGER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN', 'HR_MANAGER'],
    delete: ['ADMIN'],
    approve: ['ADMIN', 'HR_MANAGER'],
  },
  notification: {
    create: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
  esgConfig: {
    create: ['ADMIN'],
    read: ['ADMIN', 'ESG_MANAGER', 'HR_MANAGER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'EMPLOYEE'],
    update: ['ADMIN'],
    delete: ['ADMIN'],
    approve: ['ADMIN'],
  },
}

export function hasPermission(session: Session | null, entity: Entity, action: Action): boolean {
  if (!session?.user) return false

  const role = (session.user as any).role as Role
  const allowedRoles = permissionMatrix[entity][action]

  return allowedRoles.includes(role)
}

export function requirePermission(session: Session | null, entity: Entity, action: Action) {
  if (!hasPermission(session, entity, action)) {
    throw new Response('Forbidden', { status: 403 })
  }
}

export const permissions = permissionMatrix
