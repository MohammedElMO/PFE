import { updateUserInfo } from "./../../api/fetchers/post/updateUser"
import { InfoToast } from "../../notifications/toaster-notifier"
import { SittingsInfoType } from "schema/setting-into-schema.zod"

export async function updateUserProfileInfo(userInfo: SittingsInfoType) {
  const signUpState = await updateUserInfo(userInfo)
  

  switch (signUpState.state) {
    case "success":
      InfoToast("Vous avez mis à jour les informations de votre profil avec succès", "success", "top-right")

      return
    case "failed":
      await InfoToast("Une erreur s'est produite. Veuillez réessayer", "error", "top-right")
  }
}
