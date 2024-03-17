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

const passErrMessage = document.createElement("p")
const userErrMessage = document.createElement("p")
loginBtn.disabled = true
let form = null
let isValidLogin: SafeParseReturnType<LoginT, LoginT>

addEventListener("DOMContentLoaded", () => username.focus())
loginForm.addEventListener("submit", (e) => loginHandler(e, isValidLogin))
cancelBtn.addEventListener("click", resetForm)
password.addEventListener("input", ValidationHandler)
username.addEventListener("input", ValidationHandler)

function ValidationHandler() {
  form = new FormData(loginForm)
  const { username: inUserName, password: inPassword } =
    Object.fromEntries(form)

  isValidLogin = loginSchema.safeParse({
    username: inUserName,
    password: inPassword,
  })

  if (!isValidLogin.success) {
    loginBtn.disabled = true
    let formater = isValidLogin.error.format()

    if (formater.password?._errors) {
      InjectErr(
        formater.password._errors,
        "password-err",
        passErrMessage,
        password,
      )
    } else {
      passErrMessage.textContent = ""
    }

    if (formater.username?._errors) {
      InjectErr(
        formater.username?._errors,
        "user-err",
        userErrMessage,
        username,
      )
    } else {
      userErrMessage.textContent = ""
    }
  } else {
    loginBtn.disabled = false
    passErrMessage.textContent = ""
    userErrMessage.textContent = ""
  }
}

function InjectErr(
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
  passErrMessage.textContent = ""
  userErrMessage.textContent = ""
  loginBtn.disabled = true
  form = null
  username.value = ""
  password.value = ""
  remembreMeFlag.checked = false
}
