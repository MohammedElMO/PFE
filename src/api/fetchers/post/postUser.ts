import { LoginT } from "schema/login-schema.zod"
import apiClient from "../../api-client"

type AuthResponse = {
  accessToken: string
  userId: string
}

export const postUser = async (
  userPayload: LoginT,
): Promise<
  | {
      state: "success" | "failed"
      response: AuthResponse
    }
  | undefined
> => {
  try {
    const response = await apiClient.post<AuthResponse>("/login", userPayload)
    if (response.status === 200) {
      return { state: "success", response: response.data }
    }
  } catch (error) {
    console.log(error)

    return { state: "failed", response: {} as AuthResponse }
  }
}
