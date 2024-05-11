import { LoginT } from "schema/login-schema.zod"
import apiClient from "../../api-client"

type AuthResponse = {
  jwtToken: string
  refreshToken: string
}

export const postUser = async (userPayload: LoginT) => {
  try {
    const response = await apiClient.post<AuthResponse>("/login", userPayload)
    return { state: "success", response: response.data }
  } catch (error) {
    return { state: "failed" }
  }
}
