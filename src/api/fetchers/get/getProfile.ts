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
    InfoToast("quelque chose s'est mal passé", "info", "top-right", "", true)
    return 
  }
}
