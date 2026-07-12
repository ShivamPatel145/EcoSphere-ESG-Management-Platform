// =============================================================
// API: /api/departments — GET list (read-only reference data)
// Used by Environmental module dropdowns (carbon + goals forms)
// OWNER: Shivam owns departments page, but this thin list endpoint
//        is needed by Mitesh's forms. All roles can read.
// =============================================================
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/api-helpers'
import { requirePermission } from '@/server/permissions'
import { db } from '@/db'
import { departments } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const GET = withAuth(async (_req: NextRequest, ctx: any) => {
  requirePermission(ctx.session, 'department', 'read')
  const data = await db
    .select({ id: departments.id, name: departments.name, code: departments.code })
    .from(departments)
    .where(eq(departments.status, 'ACTIVE'))
  return NextResponse.json(data)
})
