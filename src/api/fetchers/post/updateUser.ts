import apiClient from "../../api-client"
import { SittingsInfoType } from "schema/setting-into-schema.zod"
import Cookies from "js-cookie"
export const updateUserInfo = async (
  userInfo: SittingsInfoType,
): Promise<{ state: "success" } | { state: "failed" }> => {
  try {
    const res = await apiClient.post("/profile-info", userInfo,{
      headers:{
        "Authorization":Cookies.get("jwtToken")
      }
    })
    if (res.status === 200) return { state: "success" }
    return {
      state: "failed",
    }
  } catch (error) {
    return {
      state: "failed",
    }
  }
}
