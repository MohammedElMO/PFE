import { sendSignUp } from "../fetchers/post/SignUpUser"
import { SafeParseReturnType } from "zod"
import { loginToater } from "../../notifications/toaster-notifier"
import { redirect } from "../../utils/Routing/redirect"
import { Routes } from "../../constants/Redirects"
import { saveToken } from "../../utils/local-storage/saveTocken"
import { SignUp } from "../../schema/signup-schema.zod"

export async function signUpUser(
  validSignUp: SafeParseReturnType<SignUp, SignUp>,
) {
  if (validSignUp.success) {
    const state = await sendSignUp({
      email: validSignUp.data.email,
      fullName: `${validSignUp.data.firstName} ${validSignUp.data.lastName}`,
      password: validSignUp.data.password,
    })

    switch (state?.state) {
      case "success":
        let conformation = await loginToater(
          "you created Your account!",
          "info",
        )
        saveToken("accessToken", state.response.accessToken)
        saveToken("userId", state.response.userId)

        if (conformation.isConfirmed) {
          redirect(Routes.MAIN_PAGE)
        }
        break
      case "failed":
        loginToater("Error Has Happend Try Again", "error")
        break

      default:
        break
    }
  }
}
