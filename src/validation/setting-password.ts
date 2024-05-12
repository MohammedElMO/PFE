import { SettingPassT, settingPassSchema } from "../schema/setting-password.zod"
import "../styles/utils.css"
import { InfoToast } from "../notifications/toaster-notifier"
import { SafeParseReturnType } from "zod"
import { changePassword } from "../api/fetchers/post/savePassword"

export const currentPassword = document.querySelector(
  "#current-password",
) as HTMLInputElement
export const newPassword = document.querySelector(
  "#nouveau-mot-de-passe",
) as HTMLInputElement
export const confirmePassword = document.querySelector(
  "#confirme-password",
) as HTMLInputElement

export const savePassBtn = document.querySelector(
  "#save-pass",
) as HTMLButtonElement
export const revertBtn = document.querySelector("#revert") as HTMLButtonElement

savePassBtn.disabled = true
let validCredentials: SafeParseReturnType<SettingPassT, SettingPassT>
const form = document.querySelector("#change-pass-form") as HTMLFormElement

const cErr = document.createElement("p")
const nErr = document.createElement("p")
const conErr = document.createElement("p")

const clearErr = () => {
  cErr.remove()
  nErr.remove()
  conErr.remove()
  savePassBtn.disabled = true
}

const clearInputs = () => {
  confirmePassword.value = ""
  newPassword.value = ""
  currentPassword.value = ""
}
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const credentials = Object.fromEntries(formData) as SettingPassT
  if (
    !samePassChack(credentials.nouveauMotDePasse, credentials.confirmePassword)
  )
    return

  if (!validCredentials.success) {
    InfoToast(
      "Vous devriez remplir les champs correctement",
      "info",

      "bottom-right",
      "",
      true,
    )
    return
  }
  const savePassword = await changePassword(credentials)

  if (savePassword.state === "failed")
    return InfoToast(
      "Le mot de passe que vous avez fourni n'est pas correct. Veuillez saisir le bon mot de passe pour le compte.",
      "warning",
      "center",
      "",
      false,
    )
  clearErr()
  clearInputs()

  return InfoToast(
    "Votre mot de passe a été mis à jour avec succès",
    "success",
    "center",
    "",
    false,
  )
})

const samePassChack = (currentPass: string, confirmPass: string) => {
  if (currentPass !== confirmPass) {
    InjectError(
      [
        "Le mot de passe de confirmation doit correspondre au nouveau mot de passe",
      ],
      "user-err",
      conErr,
      confirmePassword,
    )
    return false
  }

  return true
}

revertBtn.addEventListener("click", () => {
  clearInputs()
  clearErr()
})

currentPassword.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement
  ValidationHandler("currentPassword", target, cErr)
})
newPassword.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement

  ValidationHandler("nouveauMotDePasse", target, nErr)
})
confirmePassword.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement

  ValidationHandler("confirmePassword", target, conErr)
})

function ValidationHandler(
  targetLabel: "confirmePassword" | "currentPassword" | "nouveauMotDePasse",
  target: HTMLInputElement,
  err: HTMLParagraphElement,
) {
  const formData = new FormData(form)
  const credentials = Object.fromEntries(formData)
  validCredentials = settingPassSchema.safeParse(credentials)
  if (!validCredentials.success) {
    let rules = validCredentials.error.format()
    if (rules[targetLabel]?._errors) {
      savePassBtn.disabled = true
      InjectError(rules[targetLabel]!._errors, "user-err", err, target)
    } else {
      err.remove()
    }
  } else {
    err.remove()
    savePassBtn.disabled = false
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
