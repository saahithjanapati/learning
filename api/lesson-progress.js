import { getSql } from "./_lib/db.js"
import { requireSessionUser } from "./_lib/auth.js"
import { methodNotAllowed, readJsonBody, sendApiError, sendJson } from "./_lib/http.js"

function normalizeLessonId(value) {
  if (typeof value !== "string") {
    return ""
  }

  const normalized = value.trim().replace(/^\/+|\/+$/g, "")

  if (
    !normalized ||
    normalized.length > 800 ||
    normalized.includes("..") ||
    /[\u0000-\u001f]/.test(normalized)
  ) {
    return ""
  }

  return normalized
}

function serializeProgress(row) {
  return {
    lessonId: row.lesson_id,
    isRead: row.is_read,
    readAt: row.read_at,
    updatedAt: row.updated_at,
  }
}

async function listProgress(response, user) {
  const sql = getSql()
  const rows = await sql`
    SELECT lesson_id, is_read, read_at, updated_at
    FROM reader_lesson_progress
    WHERE user_id = ${user.id}
    ORDER BY updated_at DESC
  `

  sendJson(response, 200, {
    progress: rows.map(serializeProgress),
  })
}

async function updateProgress(request, response, user) {
  const body = await readJsonBody(request)
  const lessonId = normalizeLessonId(body.lessonId)
  const isRead = body.isRead === true

  if (!lessonId) {
    const error = new Error("A valid lessonId is required")
    error.statusCode = 400
    throw error
  }

  const sql = getSql()
  const [row] = await sql`
    INSERT INTO reader_lesson_progress (
      user_id,
      lesson_id,
      is_read,
      read_at,
      updated_at
    )
    VALUES (
      ${user.id},
      ${lessonId},
      ${isRead},
      CASE WHEN ${isRead}::boolean THEN now() ELSE NULL END,
      now()
    )
    ON CONFLICT (user_id, lesson_id) DO UPDATE SET
      is_read = EXCLUDED.is_read,
      read_at = CASE WHEN EXCLUDED.is_read THEN now() ELSE NULL END,
      updated_at = now()
    RETURNING lesson_id, is_read, read_at, updated_at
  `

  sendJson(response, 200, {
    progress: serializeProgress(row),
  })
}

export default async function handler(request, response) {
  if (!["GET", "PUT", "POST"].includes(request.method)) {
    methodNotAllowed(response, ["GET", "PUT", "POST"])
    return
  }

  try {
    const user = await requireSessionUser(request)

    if (request.method === "GET") {
      await listProgress(response, user)
      return
    }

    await updateProgress(request, response, user)
  } catch (error) {
    sendApiError(response, error, "Could not update lesson progress")
  }
}
