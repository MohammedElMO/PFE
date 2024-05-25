import { AxiosError } from "axios"
import { InfoToast } from "../../../notifications/toaster-notifier"
import apiClient from "../../api-client"
import Cookies from "js-cookie"

export type MedicineFavT = {
  Preferer: {
    date_preferation: Date
    medicament: {
      Contain: {
        quantite: number
        pharmacie: {
          nom_pharmacie: string
          ville_pharmacie: string
          adresse_pharmacie: string
          adresse_email: string
          fix_pharmacie: string
          Heure_ouverture: Date
          Heure_fermeture: Date
          lat_pharmacie: number
          lot_pharmacie: number
        }
      }[]
    } & {
      id_medicament: number
      nom_medicament: string
      dosage: string
      description_medicament: string
      type: string
      tva: number
      prix: number
    }
  }[]
}

export const getFavouriteMedicines = async () => {
  try {
    const res = await apiClient.get<MedicineFavT>("/medicines/favourites", {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })
    if (res.status !== 200) {
      InfoToast("quelque chose s'est mal passé", "info", "top-right")
      return
    }

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
