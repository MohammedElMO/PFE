import { SafeParseReturnType } from "zod"
import { LoginT, loginSchema } from "../schema/login-schema.zod"
import "../styles/utils.css"

const loginForm = <HTMLFormElement>document.querySelector("form")
const password = document.querySelector("#password") as HTMLInputElement
const username = document.querySelector("#username") as HTMLInputElement
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

addEventListener("DOMContentLoaded", () =>
    username.focus({ preventScroll: true }),
)
cancelBtn.addEventListener("click", resetForm)
loginForm.addEventListener("submit", loginHandler)
password.addEventListener("input", ValidationHandler)
username.addEventListener("input", ValidationHandler)

function loginHandler(e: SubmitEvent) {
    e.preventDefault()
    if (isValidLogin.success) alert("booom")
}

function ValidationHandler() {
    form = new FormData(loginForm)
    const { username: inUserName, password: inPassword } =
        Object.fromEntries(form)
    // console.log(inUserName, inPassword)
    isValidLogin = loginSchema.safeParse({
        username: inUserName,
        password: inPassword,
    })

    if (!isValidLogin.success) {
        loginBtn.disabled = true
        let formater = isValidLogin.error.formErrors.fieldErrors
        console.log(formater)

        if (formater?.password) {
            injectErr(
                formater.password,
                "password-err",
                passErrMessage,
                password,
            )
        } else {
            passErrMessage.textContent = ""
        }
        if (formater?.username) {
            injectErr(formater.username, "user-err", userErrMessage, username)
        } else {
            userErrMessage.textContent = ""
        }
    } else {
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

function resetForm() {
    passErrMessage.textContent = ""
    userErrMessage.textContent = ""
    loginBtn.disabled = true
    form = null
    username.value = ""
    password.value = ""
    remembreMeFlag.checked = false
}
