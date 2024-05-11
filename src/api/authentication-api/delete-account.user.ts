import { redirect } from "../../utils/Routing/redirect"
import { InfoToast } from "../../notifications/toaster-notifier"
import Cookies from "js-cookie"
export async function deleteUserAccount(isDeleted: any) {
  switch (isDeleted) {
    case "success":
      const isConfirmed = await InfoToast(
        "you account is deleted,bye",
        "success",
        "center",
        undefined,
        false,
      )
      Cookies.remove("jwtToken")

      if (isConfirmed.isConfirmed) redirect("/")
      return
    case "failed":
      await InfoToast(
        "Error Has Occured, try again",
        "error",
        "top-right",
        undefined,
        true,
      )
  }
}
