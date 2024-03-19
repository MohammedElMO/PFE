import { SafeParseReturnType } from "zod"
import "../styles/utils.css"
import { signupSchema, SignUp } from "../schema/signup-schema.zod"
import { signUpUser } from "../api/authentication-api/sign-up.user"
import { SignupToater, loginToater } from "../notifications/toaster-notifier"

const signUp = document.querySelector(".sign-up") as HTMLFormElement
const firstName = document.querySelector("#firstName") as HTMLInputElement
const lastName = document.querySelector("#lastName") as HTMLInputElement

const password = document.querySelector("#password") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const createAccount = document.querySelector(
  ".create-account",
) as HTMLButtonElement
let signUpFormData = null
// let validConfirmation = false
let validCredentials: SafeParseReturnType<SignUp, SignUp>
addEventListener("DOMContentLoaded", () => firstName.focus())
diableBtn("infomation must be valid", true)
// let err = document.createElement("p")
let passwordErr = document.createElement("p")
let firstNameErr = document.createElement("p")
let lastNameErr = document.createElement("p")
let emailErr = document.createElement("p")

signUp.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (validCredentials.success)
    signUpUser(validCredentials.data).catch((e) =>
      SignupToater(
        "you email is already been used",
        "warning",
        "",
        "top-right",
      ),
    )
})
// const checkConfermation = (input: HTMLInputElement) => {
//   if (password.value !== (confirmPassword as HTMLInputElement).value) {
//     displayError(["must match the password field"], "err", err, input)
//     diableBtn("infomation must be valid", true)

//     validConfirmation = false
//   } else {
//     diableBtn("create ", false)

//     err.remove()
//     validConfirmation = true
//   }
// }

firstName.addEventListener("input", (e) => {
  ValidationHandler("firstName", e.target as HTMLInputElement, firstNameErr)
})
lastName.addEventListener("input", (e) => {
  ValidationHandler("lastName", e.target as HTMLInputElement, lastNameErr)
})
password.addEventListener("input", (e) => {
  ValidationHandler("password", e.target as HTMLInputElement, passwordErr)
  // checkConfermation(confirmPassword as HTMLInputElement)
})
email.addEventListener("input", (e) => {
  ValidationHandler("email", e.target as HTMLInputElement, emailErr)
})

// confirmPassword.addEventListener("input", (e) => {
//   checkConfermation(e.target as HTMLInputElement)
// })

function ValidationHandler(
  targetLabel: "firstName" | "lastName" | "password" | "email",
  target: HTMLInputElement,
  err: HTMLParagraphElement,
) {
  signUpFormData = new FormData(signUp)
  const credentials = Object.fromEntries(signUpFormData)

  validCredentials = signupSchema.safeParse(credentials)

  if (!validCredentials.success) {
    diableBtn("infomation must be valid", true)
    let rules = validCredentials.error.format()
    console.log(rules)
    if (rules[targetLabel]?._errors) {
      displayError(rules[targetLabel]!._errors, "err", err, target)
    } else err.remove()
  } else {
    err.remove()
    diableBtn("create an account", false)
  }
}

function diableBtn(message: string, state: boolean) {
  createAccount.textContent = message
  createAccount.disabled = state
}

function displayError(
  errors: string[],
  errClass: string,
  errDisplayer: HTMLParagraphElement,
  input: HTMLInputElement,
) {
  errDisplayer.classList.add(errClass)
  errDisplayer.textContent = errors.join("\n")
  input.after(errDisplayer)
}
