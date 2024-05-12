import { SignUpType } from "schema/signup-schema.zod"
import apiClient from "../../api-client"

type SignUpMessage = {
  jwtToken: string
  userId: string
}

export const sendSignUp = async (
  userPayload: SignUpType,
): Promise<{ state: "success"; jwtToken: string } | { state: "failed" }> => {
  try {
    const res = await apiClient.post<SignUpMessage>("/signup", userPayload)
    return { state: "success", jwtToken: res.data.jwtToken }
  } catch (error) {
    return {
      state: "failed",
    }
  }
}
