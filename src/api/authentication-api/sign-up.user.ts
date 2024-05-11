import { sendSignUp } from "../fetchers/post/SignUpUser"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import { saveTokenCookie } from "../../utils/storage/saveToken"
import { SignUpType } from "../../schema/signup-schema.zod"

export async function registerUser(validSignUp: SignUpType) {
  const signUpState = await sendSignUp(validSignUp)

  switch (signUpState.state) {
    case "success":
      let conformation = await loginToater(
        "you created Your account!",
        "success",
      )
      saveTokenCookie("accessToken", signUpState.accessToken)

      if (conformation.isConfirmed) {
        redirect(Routes.MAIN_PAGE)
      }
      return
    case "failed":
      await loginToater(
        "Error Has Occured Change the username or try again",
        "error",
      )
  }
}
