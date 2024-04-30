import { SignUpType } from "schema/signup-schema.zod"
import apiClient from "../../api-client"

type SignUpMessage = {
  accessToken: string
  userId: string
  message: "user successfully created!"
}

export const sendSignUp = async (
  userPayload: SignUpType,
): Promise<{ state: "success"; accessToken: string } | { state: "failed" }> => {
  try {
    const res = await apiClient.post<SignUpMessage>("/signup", userPayload)
    return { state: "success", accessToken: res.data.accessToken }
  } catch (error) {
    return {
      state: "failed",
    }
  }
}
