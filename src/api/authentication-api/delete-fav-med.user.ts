import { InfoToast } from "../../notifications/toaster-notifier"

export async function deleteFavUserMed(isDeleted: any) {
  switch (isDeleted) {
    case "success":
      await InfoToast(
        "Votre médicament favori a été supprimé",
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
