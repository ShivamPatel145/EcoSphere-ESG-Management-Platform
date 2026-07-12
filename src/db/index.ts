import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

// Create drizzle client with Neon HTTP driver
// Requires DATABASE_URL environment variable pointing to Neon PostgreSQL database
const client = neon(process.env.DATABASE_URL || '')

export const db = drizzle(client)
