import { SettingPassT } from "schema/setting-password.zod"
import apiClient from "../../api-client"
import Cookies from "js-cookie"
import { redirectIfNoAuthicated } from "../get/getProfile"

export const changePassword = async (
  passwords: SettingPassT,
): Promise<{ state: "success" } | { state: "failed" }> => {
  try {
    const res = await apiClient.put("/change-profile-pass", passwords, {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })
    if (res.status === 200) {
      return { state: "success" }
    }
    return { state: "failed" }
  } catch (error) {
    redirectIfNoAuthicated(error)

    return {
      state: "failed",
    }
  }
}
