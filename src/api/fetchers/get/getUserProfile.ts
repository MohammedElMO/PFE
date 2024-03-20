import apiClient from "../../api-client"

export const getUserProfile = async (id: string) => {
  try {
    const response = await apiClient.get("/profile/" + id)
    if (response.status === 200) {
      return { state: "success", response: response.data }
    }
  } catch (error) {
    console.log(error)

    return { state: "failed" }
  }
}
