import { SafeParseReturnType } from "zod"
import { LoginT, loginSchema } from "../schema/login-schema.zod"
import "../styles/utils.css"

const loginForm = document.querySelector("form") as HTMLFormElement
const password = document.querySelector("#password") as HTMLInputElement
const username = document.querySelector("#username") as HTMLInputElement
const cancelBtn = document.querySelector(".cancel") as HTMLButtonElement
const loginBtn = document.querySelector(".log-in") as HTMLButtonElement
// const loginSpinner = document.createElement("div")
// loginSpinner.classList.add("login-ring")
// loginBtn.textContent = ""

const remembreMeFlag = document.querySelector(
  "#remember-me",
) as HTMLInputElement

const passErrMessage = document.createElement("p")
const userErrMessage = document.createElement("p")
loginBtn.disabled = true
let form = null
let isValidLogin: SafeParseReturnType<LoginT, LoginT>

addEventListener("DOMContentLoaded", () => username.focus())
// loginForm.addEventListener("submit", ValidationHandler)
cancelBtn.addEventListener("click", resetForm)
password.addEventListener("input", ValidationHandler)
username.addEventListener("input", ValidationHandler)

function loginHandler(e: SubmitEvent) {
  e.preventDefault()
  if (isValidLogin.success) alert("booom")
}

function ValidationHandler(e: Event) {
  console.log(e.currentTarget)
  form = new FormData(loginForm)
  const { username: inUserName, password: inPassword } =
    Object.fromEntries(form)
  console.log(inUserName)
  console.log(inPassword)

  isValidLogin = loginSchema.safeParse({
    username: inUserName,
    password: inPassword,
  })

  if (!isValidLogin.success) {
    loginBtn.disabled = true
    let formater = isValidLogin.error.format()
    console.log(formater)

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
