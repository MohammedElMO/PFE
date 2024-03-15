import { LoginT } from "schema/login-schema.zod"
import apiClient from "../api-client"

export const getUser = async (userPayload: LoginT) => {
  try {
    const response = await apiClient.get("user", {
      data: userPayload,
    })
    if (response.status === 200) {
      console.log("sucess response")
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
