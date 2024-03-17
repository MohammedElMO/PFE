import { postUser } from "../../api/fetchers/get/postUser"
import { type LoginT } from "../../schema/login-schema.zod"
import { SafeParseReturnType } from "zod"
import { password, username } from "../../validation/login-form-validation"
import { reset } from "../../utils/form-controles/rest"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"

// password9012
// Olivia Wilson
export const loginHandler = async (
  e: SubmitEvent,
  loginvalid: SafeParseReturnType<LoginT, LoginT>,
) => {
  e.preventDefault()

  if (loginvalid.success) {
    const state = await postUser({
      username: loginvalid.data.username,
      password: loginvalid.data.password,
    })

    switch (state?.state) {
      case "failed":
        loginToater(
          "Credential are incorrect \n Try again!",
          "error",
        )
        reset([password, username])
        break
      case "success":
        let conformation = await loginToater(
          "You've Log in successfully!",
          "success",
        )
        if (conformation.isConfirmed) {
          redirect(Routes.MAIN_PAGE)
        }
        break

      default:
        break
    }
  }
}
