import { LoginT } from "schema/login-schema.zod"
import apiClient from "../../api-client"

type AuthResponse = {
  jwtToken: string
  refreshToken: string
}

export const postUser = async (userCredentials: LoginT) => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/login",
      userCredentials,
    )
    if (response.status === 200)
      return { state: "success", response: response.data }
    return { state: "failed" }
  } catch (error) {
    return { state: "failed" }
  }
}
