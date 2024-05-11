import apiClient from "../../api-client"
import Cookies from "js-cookie"
export const deleteAccount = async (): Promise<
  { state: "failed" } | { state: "success" }
> => {
  try {
    const response = await apiClient.delete<string>("/delete-profile", {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })

    if (response.status === 200) {
      return {
        state: "success",
      }
    }
    return { state: "failed" }
  } catch (error) {
    return {
      state: "failed",
    }
  }
}
