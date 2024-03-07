import { SafeParseReturnType, ZodFormattedError } from "zod"
import { LoginT, loginSchema } from "../schema/login-schema.zod"
import "../styles/utils.css"
import { loginSuccessToater } from "../utils/toaster-notifier"

const loginForm = <HTMLFormElement>document.querySelector("form")
const password = document.querySelector("#password") as HTMLInputElement
const username = document.querySelector("#username") as HTMLInputElement
const loginBtn = document.querySelector(".log-in") as HTMLButtonElement

loginForm.addEventListener("submit", loginHandler)
loginBtn.addEventListener("click", () => {
  loginSuccessToater()
})
password.addEventListener("input", ValidationHandler)
username.addEventListener("input", ValidationHandler)
const passErrMessage = document.createElement("p")
const userErrMessage = document.createElement("p")
loginBtn.disabled = true
let formater: ZodFormattedError<LoginT, string>
let form
let isValidLogin: SafeParseReturnType<LoginT, LoginT>

function loginHandler(e: SubmitEvent) {
  e.preventDefault()
  // console.log(formater?.password?._errors)
  // console.log(formater?.username?._errors)
  // if (isValidLogin.success) {
  //   alert("login success")
  // }
  // let data = Object.fromEntries(new FormData(loginForm))
  // console.log(data)
}

function ValidationHandler(e: Event) {
  e.preventDefault()
  form = new FormData(loginForm)
  const { username: inUserName, password: inPassword } =
    Object.fromEntries(form)

  isValidLogin = loginSchema.safeParse({
    username: inUserName,
    password: inPassword,
  })
  console.log(form.get("username"))

  if (!isValidLogin.success) {
    loginBtn.disabled = true
    formater = isValidLogin.error.format()
    console.log(formater)
    if (formater.password?._errors) {
      injectErr(
        formater.password._errors,
        "password-err",
        passErrMessage,
        password,
      )
    }
    if (formater.username?._errors) {
      injectErr(
        formater.username?._errors,
        "user-err",
        userErrMessage,
        username,
      )
    }
  } else {
    passErrMessage.textContent = ""
    userErrMessage.textContent = ""
    loginBtn.disabled = false
  }
}

function injectErr(
  errors: string[],
  errClass: string,
  errDisplayer: HTMLParagraphElement,
  input: HTMLInputElement,
) {
  errDisplayer.classList.add(errClass)
  errDisplayer.textContent = errors.join("\n")
  input.parentElement?.after(errDisplayer)
}
