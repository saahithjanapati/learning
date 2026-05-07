import { neon } from "@neondatabase/serverless"

let sqlClient = null
let schemaPromise = null

export function getSql() {
  if (!process.env.DATABASE_URL) {
    const error = new Error("DATABASE_URL is not configured")
    error.statusCode = 500
    throw error
  }

  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL)
  }

  return sqlClient
}

export async function ensureReaderSchema() {
  if (!schemaPromise) {
    schemaPromise = migrateReaderSchema().catch((error) => {
      schemaPromise = null
      throw error
    })
  }

  return schemaPromise
}

async function migrateReaderSchema() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS reader_users (
      id text PRIMARY KEY,
      google_sub text NOT NULL UNIQUE,
      email text NOT NULL,
      email_verified boolean NOT NULL DEFAULT false,
      name text,
      picture_url text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS reader_users_email_unique
      ON reader_users (lower(email))
  `

  await sql`
    CREATE TABLE IF NOT EXISTS reader_sessions (
      token_hash text PRIMARY KEY,
      user_id text NOT NULL REFERENCES reader_users(id) ON DELETE CASCADE,
      created_at timestamptz NOT NULL DEFAULT now(),
      last_seen_at timestamptz NOT NULL DEFAULT now(),
      expires_at timestamptz NOT NULL
    )
  `

  await sql`
    CREATE INDEX IF NOT EXISTS reader_sessions_user_id_idx
      ON reader_sessions (user_id)
  `

  await sql`
    CREATE TABLE IF NOT EXISTS reader_lesson_progress (
      user_id text NOT NULL REFERENCES reader_users(id) ON DELETE CASCADE,
      lesson_id text NOT NULL,
      is_read boolean NOT NULL DEFAULT true,
      read_at timestamptz,
      updated_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, lesson_id)
    )
  `
}
