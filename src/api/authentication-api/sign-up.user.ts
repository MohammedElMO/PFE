import { sendSignUp } from "../fetchers/post/SignUpUser"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import { SignUpType } from "../../schema/signup-schema.zod"
import Cookies from "js-cookie"

export async function registerUser(validSignUp: SignUpType) {
  const signUpState = await sendSignUp(validSignUp)

  switch (signUpState.state) {
    case "success":
      let conformation = await loginToater(
        "Votre compte a été créé!",
        "success",
      )
      Cookies.set("jwtToken", signUpState.jwtToken, {
        expires: 1,
        secure: true,
      })

      if (conformation.isConfirmed) {
        redirect(Routes.MAIN_PAGE)
      }
      return
    case "failed":
      await loginToater(
        "Une erreur s'est produite. Veuillez réessayer",
        "error",
      )
  }
}
