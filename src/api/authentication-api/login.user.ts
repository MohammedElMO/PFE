import { postUser } from "../fetchers/post/postUser"
import { type LoginT } from "../../schema/login-schema.zod"
import {
  password as passwordIn,
  username as usernameIn,
} from "../../validation/login-form-validation"
import { reset } from "../../utils/form-controles/rest"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import Cookies from "js-cookie"
export const loginHandler = async ({ password, username }: LoginT) => {
  const state = await postUser({ username, password })
  switch (state?.state) {
    case "success":
      let conformation = await loginToater(
        "Vous vous êtes connecté avec succès!",
        "success",
      )
      Cookies.set("jwtToken", state.response!.jwtToken, {
        secure: true,
        expires:1
      })

      if (conformation.isConfirmed) {
        redirect(Routes.MAIN_PAGE)
      }
      return
    case "failed":
      loginToater("Les identifiants sont incorrects. Veuillez réessayer!", "error")
      reset([passwordIn, usernameIn])
      return

    default:
      return
  }
}
