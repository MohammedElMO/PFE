import { InfoToast } from "../../notifications/toaster-notifier"

export async function deleteFavUserPhar(isDeleted: any) {
  switch (isDeleted) {
    case "success":
      await InfoToast(
        "Votre pharmcie favori a été supprimé",
        "success",
        "center",
      )

      return
    case "failed":
      await InfoToast(
        "Une erreur est survenue. Veuillez réessayer.",
        "error",
        "top-right",
      )
  }
}
