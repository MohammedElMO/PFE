import { LoginT } from "schema/login-schema.zod"
import apiClient from "../../api-client"

export const postUser = async (
  userPayload: LoginT,
): Promise<{ state: "success" | "failed" } | undefined> => {
  try {
    const response = await apiClient.post("/login", userPayload)
    if (response.status === 200) {
      return { state: "success" }
    }
  } catch (error) {
    console.log(error)

    return { state: "failed" }
  }
}
