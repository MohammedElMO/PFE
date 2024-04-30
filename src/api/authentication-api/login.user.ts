import { postUser } from "../fetchers/post/postUser"
import { type LoginT } from "../../schema/login-schema.zod"
import { SafeParseReturnType } from "zod"
import { password, username } from "../../validation/login-form-validation"
import { reset } from "../../utils/form-controles/rest"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import { saveTokenCookie } from "../../utils/local-storage/saveTocken"

// password9012
// Olivia Wilson
export const loginHandler = async (loginvalid: LoginT) => {
  const state = await postUser({
    username: loginvalid.username,
    password: loginvalid.password,
  })

  switch (state?.state) {
    case "failed":
      loginToater("Credential are incorrect \n Try again!", "error")
      reset([password, username])
      break
    case "success":
      let conformation = await loginToater(
        "You've Log in successfully!",
        "success",
      )
      saveTokenCookie("accessToken", state.response.accessToken)
      saveTokenCookie("userId", state.response.userId)

      if (conformation.isConfirmed) {
        redirect(Routes.MAIN_PAGE)
      }
      break

    default:
      break
  }
}
