// /pharmacies/favourites

import { AxiosError } from "axios"
import { InfoToast } from "../../../notifications/toaster-notifier"
import apiClient from "../../api-client"
import Cookies from "js-cookie"
export type PharmaciesFavT = {
  favoriser: [
    {
      id_utilisateur: number
      id_pharmacie: number
      date_favorisation: Date
      pharmacie: {
        id_pharmacie: number
        nom_pharmacie: string
        ville_pharmacie: string
        adresse_pharmacie: string
        adresse_email: string
        fix_pharmacie: number
        lat_pharmacie: number
        lot_pharmacie: number
        Heure_ouverture: Date
        Heure_fermeture: Date
        id_creater_pharmacie: number
      }
    },
  ]
}

export const getFavouritePharmacies = async () => {
  try {
    const res = await apiClient.get<PharmaciesFavT>("/pharmacies/favourites", {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })
    if (res.status !== 200) {
      InfoToast("quelque chose s'est mal passé", "info", "top-right", "", true)
      return
    }
    return res.data
  } catch (error) {
    redirectIfNoAuthicated(error)
    InfoToast("quelque chose s'est mal passé", "info", "top-right", "", true)
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
