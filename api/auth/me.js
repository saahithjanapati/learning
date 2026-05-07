import { getSessionUser } from "../_lib/auth.js"
import { methodNotAllowed, sendApiError, sendJson } from "../_lib/http.js"

export default async function handler(request, response) {
  if (request.method !== "GET") {
    methodNotAllowed(response, ["GET"])
    return
  }

  try {
    const user = await getSessionUser(request)
    sendJson(response, 200, { user })
  } catch (error) {
    sendApiError(response, error, "Could not read session")
  }
}
