import apiClient from "../../api-client"

type SignUp = {
  accessToken: string
  userId?: string
  message: string
  result?: any
  success?: boolean
}

export const sendSignUp = async (userPayload: {
  fullName: string
  email: string
  password: string
}): Promise<{
  state: "success" | "failed"
  response: SignUp
}> => {
  try {
    const response = await apiClient.post<SignUp>("/signup", userPayload)
    return { state: "success", response: response.data }
  } catch (error) {
    return {
      state: "failed",
      response: {
        success: false,
      } as SignUp,
    }
  }
}
