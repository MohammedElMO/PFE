import { SafeParseReturnType } from "zod"
import "../styles/utils.css"
import { signupSchema, SignUp } from "../schema/signup-schema.zod"

const signUp = document.querySelector(".sign-up") as HTMLFormElement
const firstName = document.querySelector("#firstName") as HTMLInputElement
const lastName = document.querySelector("#lastName") as HTMLInputElement
const confirmPassword = document.querySelector(
  "#confirm-password",
) as HTMLInputElement
const password = document.querySelector("#password") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const createAccount = document.querySelector(
  ".create-account",
) as HTMLFormElement
let signUpFormData = null
let validCredentials: SafeParseReturnType<SignUp, SignUp>
addEventListener("DOMContentLoaded", () => firstName.focus())

signUp.addEventListener("submit", (e) => {
  e.preventDefault()
})

firstName.addEventListener("input", (e) => {
  ValidationHandler("firstName", e.target as HTMLInputElement)
})
lastName.addEventListener("input", (e) => {
  ValidationHandler("lastName", e.target as HTMLInputElement)
})
password.addEventListener("input", (e) => {
  ValidationHandler("password", e.target as HTMLInputElement)
})
email.addEventListener("input", (e) => {
  ValidationHandler("email", e.target as HTMLInputElement)
})
confirmPassword.addEventListener("input", (e) => {
  if (password.value !== (e.target as HTMLInputElement).value) {
    displayError(
      ["must match the password field"],
      "err",
      err,
      e.target as HTMLInputElement,
    )
  } else err.remove()
})

let err = document.createElement("p")

function ValidationHandler(
  targetLabel: "firstName" | "lastName" | "password" | "email",
  target: HTMLInputElement,
) {
  signUpFormData = new FormData(signUp)
  const credentials = Object.fromEntries(signUpFormData)

  validCredentials = signupSchema.safeParse(credentials)

  if (!validCredentials.success) {
    let rules = validCredentials.error.format()
    console.log(rules)
    if (rules[targetLabel]?._errors)
      displayError(rules[targetLabel]!._errors, "err", err, target)
    else err.remove()
  } else err.remove()
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
