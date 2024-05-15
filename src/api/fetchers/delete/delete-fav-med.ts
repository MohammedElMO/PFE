import apiClient from "../../api-client"
import Cookies from "js-cookie"

export const  deleteMedFav = async (
  id: number,
): Promise<{ state: "failed" } | { state: "success" }> => {
  try {
    const response = await apiClient.delete("/medicines/favourites/" + id, {
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
