import { AxiosError } from "axios"
import { InfoToast } from "../../../notifications/toaster-notifier"
import apiClient from "../../api-client"
import Cookies from "js-cookie"
export type Settings = {
  nom_utilisateur: string
  prenom_utilisateur: string
  uesrname: string
  email_utilisateur: string
}

export const getProfile = async () => {
  try {
    const res = await apiClient.get<Settings>("/profile", {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })

    return res.data
  } catch (error) {
    redirectIfNoAuthicated(error)

    InfoToast("quelque chose s'est mal passé", "info", "top-right")
    return
  }
}

export const redirectIfNoAuthicated = (error: any) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      location.href = "/"
      return
    }
  }
}
