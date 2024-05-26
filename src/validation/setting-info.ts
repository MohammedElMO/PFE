import "../styles/utils.css"
import {
  SettingsInfo,
  SittingsInfoType,
} from "../schema/setting-into-schema.zod"
import { Settings, getProfile } from "../api/fetchers/get/getProfile"
import { SafeParseReturnType } from "zod"
import { InfoToast } from "../notifications/toaster-notifier"
import { updateUserProfileInfo } from "../api/authentication-api/info.user"
import apiClient from "../api/api-client"
import { nonValidIcon, validIcon } from "../utils/icons/icons"




export let settings = (await getProfile()) as Settings

const firstName = document.querySelector("#firstName") as HTMLInputElement
const lastName = document.querySelector("#lastName") as HTMLInputElement
const email = document.querySelector("#email") as HTMLInputElement
const username = document.querySelector("#username") as HTMLInputElement
const saverBtn = document.querySelector("#saver") as HTMLButtonElement
const fErr = document.createElement("p")
const lErr = document.createElement("p")
const eErr = document.createElement("p")
const uErr = document.createElement("p")

saverBtn.disabled = true
if (settings) {
  firstName.value = settings.prenom_utilisateur
  lastName.value = settings.nom_utilisateur
  email.value = settings.email_utilisateur
  username.value = settings.username
}

let validCredentials: SafeParseReturnType<SittingsInfoType, SittingsInfoType>
const form = document.querySelector("#settings-info") as HTMLFormElement

const usernameContainer = document.querySelector(
  ".username-container",
) as HTMLDivElement

// cheking if the username aleady exist
async function checkUserExistence(value: string) {
  const req = await apiClient.put<{ userFound: boolean }>("/user/username", {
    username: value,
  })
  const { userFound } = req.data

  if (userFound) {
    usernameContainer.innerHTML = nonValidIcon
    InjectError(["le nom d'utilisateur est déjà pris"], "err", uErr, username)
    saverBtn.disabled = true
  } else {
    usernameContainer.innerHTML = validIcon
    saverBtn.disabled = false
  }
}

function debounce(func: (e: Event) => void, timeout = 300) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(null, args as any), timeout)
  }
}
const userNameHandler = debounce((e) => {
  const target = e.target as HTMLInputElement
  isChanging()
  ValidationHandler("username", target as HTMLInputElement, uErr)
  checkUserExistence((target as HTMLInputElement).value)
}, 700)

username.addEventListener("input", userNameHandler)

const isChanging = () => {
  const hasChanged =
    firstName.value === settings.prenom_utilisateur &&
    lastName.value === settings.nom_utilisateur &&
    email.value === settings.email_utilisateur &&
    username.value === settings.username
  if (hasChanged) return (saverBtn.disabled = true)

  return (saverBtn.disabled = false)
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  if (!validCredentials.success) {
    InfoToast(
      "Vous devriez remplir les champs correctement",
      "info",
      "top-right",
      undefined,
      true,
    )
    return
  }
  usernameContainer.innerHTML = ""

  const formData = new FormData(form)
  const credentials = Object.fromEntries(formData) as SittingsInfoType
  Promise.all([
    await updateUserProfileInfo(credentials),
    (await getProfile()) as Settings,
  ]).then(([, s]) => {
    settings = s
    isChanging()
  })
})

firstName.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement
  ValidationHandler("firstName", target, fErr)

  isChanging()
})
lastName.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement

  isChanging()
  ValidationHandler("lastName", target, lErr)
})
email.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement

  isChanging()
  ValidationHandler("email", target, eErr)
})

function ValidationHandler(
  targetLabel: "username" | "lastName" | "firstName" | "email",
  target: HTMLInputElement,
  err: HTMLParagraphElement,
) {
  const formData = new FormData(form)
  const credentials = Object.fromEntries(formData)
  validCredentials = SettingsInfo.safeParse(credentials)

  if (!validCredentials.success) {
    let rules = validCredentials.error.format()
    if (rules[targetLabel]?._errors) {
      saverBtn.disabled = false
      InjectError(rules[targetLabel]!._errors, "user-err", err, target)
    } else {
      err.remove()
    }
  } else {
    err.remove()
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
  input.after(errDisplayer)
}
