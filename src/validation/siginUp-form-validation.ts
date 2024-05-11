import { validIcon, nonValidIcon } from "../utils/icons/icons"
import { SafeParseReturnType } from "zod"
import apiClient from "../api/api-client"
import { registerUser } from "../api/authentication-api/sign-up.user"
import { signupSchema, SignUpType } from "../schema/signup-schema.zod"
import "../styles/utils.css"
const userNameContainer = document.querySelector(
  ".username-container",
) as HTMLDivElement
const signUp = document.querySelector(".sign-up") as HTMLFormElement
const firstName = document.querySelector("#firstName") as HTMLInputElement
const lastName = document.querySelector("#lastName") as HTMLInputElement
const username = document.querySelector("#username") as HTMLInputElement

const password = document.querySelector("#password") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const createAccount = document.querySelector(
  ".create-account",
) as HTMLButtonElement

let signUpFormData = null
let validCredentials: SafeParseReturnType<SignUpType, SignUpType>
addEventListener("DOMContentLoaded", () => firstName.focus())
diableBtn("les informations doivent être valides", true)

function debounce(func: (e: Event) => void, timeout = 300) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(null, args as any), timeout)
  }
}
let passwordErr = document.createElement("p")
let firstNameErr = document.createElement("p")
let lastNameErr = document.createElement("p")
let emailErr = document.createElement("p")
let usernameErr = document.createElement("p")

signUp.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (validCredentials.success) registerUser(validCredentials.data)
})

firstName.addEventListener("input", (e) => {
  ValidationHandler("firstName", e.target as HTMLInputElement, firstNameErr)
})
lastName.addEventListener("input", (e) => {
  ValidationHandler("lastName", e.target as HTMLInputElement, lastNameErr)
})

const userNameHandler = debounce((e) => {
  ValidationHandler("username", e.target as HTMLInputElement, usernameErr)
  checkUserExistence((e.target as HTMLInputElement).value)
}, 800)

username.addEventListener("input", userNameHandler),
  password.addEventListener("input", (e) => {
    ValidationHandler("password", e.target as HTMLInputElement, passwordErr)
  })
email.addEventListener("input", (e) => {
  ValidationHandler("email", e.target as HTMLInputElement, emailErr)
})

async function checkUserExistence(value: string) {
  const req = await apiClient.put<{ userFound: boolean }>("/user/username", {
    username: value,
  })
  const { userFound } = req.data

  if (userFound) {
    userNameContainer.innerHTML = nonValidIcon
    displayError(
      ["le nom d'utilisateur est déjà pris"],
      "err",
      usernameErr,
      username,
    )
  } else {
    userNameContainer.innerHTML = validIcon
  }
  if (userFound) diableBtn("les informations doivent être valides", true)
}

function ValidationHandler(
  targetLabel: "firstName" | "lastName" | "password" | "email" | "username",
  target: HTMLInputElement,
  err: HTMLParagraphElement,
) {
  signUpFormData = new FormData(signUp)
  const credentials = Object.fromEntries(signUpFormData)
  console.log(credentials)

  validCredentials = signupSchema.safeParse(credentials)

  if (!validCredentials.success) {
    diableBtn("les informations doivent être valides", true)

    let rules = validCredentials.error.format()
    if (rules[targetLabel]?._errors) {
      displayError(rules[targetLabel]!._errors, "err", err, target)
    } else err.remove()
  } else {
    err.remove()
    diableBtn("Créer un compte", false)
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
  if (input.nextElementSibling) input.nextElementSibling.after(errDisplayer)
  else input.after(errDisplayer)
}
