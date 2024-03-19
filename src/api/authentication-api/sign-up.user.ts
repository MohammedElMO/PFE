import { sendSignUp } from "../fetchers/post/SignUpUser"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import { saveToken } from "../../utils/local-storage/saveTocken"
import { SignUp } from "../../schema/signup-schema.zod"

export async function signUpUser(validSignUp: SignUp) {
  const state = await sendSignUp({
    email: validSignUp.email,
    fullName: `${validSignUp.firstName} ${validSignUp.lastName}`,
    password: validSignUp.password,
  })

  switch (state?.state) {
    case "success":
      let conformation = await loginToater(
        "you created Your account!",
        "success",
      )
      saveToken("accessToken", state.response.accessToken)
      saveToken("userId", state.response.userId!)

      if (conformation.isConfirmed) {
        redirect(Routes.MAIN_PAGE)
      }
      break
    case "failed":
      await loginToater("Error Has Happend Try Again", "error")
      throw new Error(state.response.message)

    default:
      break
  }
}
