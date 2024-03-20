import { SafeParseReturnType } from "zod"
import { LoginT, loginSchema } from "../schema/login-schema.zod"
import "../styles/utils.css"
import { loginHandler } from "../api/authentication-api/login.user"

const loginForm = document.querySelector("form") as HTMLFormElement
export const password = document.querySelector("#password") as HTMLInputElement
export const username = document.querySelector("#username") as HTMLInputElement
const cancelBtn = document.querySelector(".cancel") as HTMLButtonElement
const loginBtn = document.querySelector(".log-in") as HTMLButtonElement

const remembreMeFlag = document.querySelector(
  "#remember-me",
) as HTMLInputElement

const err = document.createElement("p")
loginBtn.disabled = true
let formData = null
let validCredentials: SafeParseReturnType<LoginT, LoginT>

addEventListener("DOMContentLoaded", () => username.focus())
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  if (validCredentials.success) loginHandler(validCredentials.data)
})
cancelBtn.addEventListener("click", resetForm)
password.addEventListener("input", (e) =>
  ValidationHandler("password", e.target as HTMLInputElement),
)
username.addEventListener("input", (e) =>
  ValidationHandler("username", e.target as HTMLInputElement),
)

function ValidationHandler(
  targetLabel: "username" | "password",
  target: HTMLInputElement,
) {
  formData = new FormData(loginForm)
  const credentials = Object.fromEntries(formData)

  validCredentials = loginSchema.safeParse(credentials)

  if (!validCredentials.success) {
    let rules = validCredentials.error.format()
    if (rules[targetLabel]?._errors) {
      loginBtn.disabled = true
      InjectError(rules[targetLabel]!._errors, "user-err", err, target)
    } else err.remove()
  } else {
    err.remove()
    loginBtn.disabled = false
  }
}

function InjectError(
  errors: string[],
  errClass: string,
  errDisplayer: HTMLParagraphElement,
  input: HTMLInputElement,
) {
  errDisplayer.classList.add(errClass)
  errDisplayer.textContent = errors.join("\n")
  input.parentElement?.after(errDisplayer)
}

function resetForm() {
  loginBtn.disabled = true
  formData = null
  username.value = ""
  password.value = ""
  remembreMeFlag.checked = false
}
