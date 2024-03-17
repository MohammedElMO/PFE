import apiClient from "../../api-client"

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/profile/:id",{
        params:{
            id:1
        }
    })
    if (response.status === 200) {
      return { state: "success" }
    }
  } catch (error) {
    console.log(error)

    return { state: "failed" }
  }
}
