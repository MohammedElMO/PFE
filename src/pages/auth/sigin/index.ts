import { loadThemeState } from "../../../utils/page-theme-controller"
import apiClient from "../../../api/api-client"
import { loadToken } from "../../../utils/local-storage/loadToken"
import { saveToken } from "../../../utils/local-storage/saveTocken"
import "../../../utils/animations/input-visibility-switcher"
import "@/styles/bg-auth.css"
import "../../../validation/siginUp-form-validation"

import { switchVisibility } from "../../../utils/animations/input-visibility-switcher"
document.querySelector(".loader")?.addEventListener("click", async () => {
  const profile = await apiClient.get("/profile/" + loadToken("userId"), {
    headers: {
      Authorization: loadToken("accessToken"),
    },
  })
  document.body.append(JSON.stringify(profile.data))
})

const toggler = <HTMLInputElement>(
  document.querySelector(".toggler")!.firstElementChild!.firstElementChild
)

console.log(toggler)
document.addEventListener("DOMContentLoaded", () => {
  const isDarken = loadThemeState()

  if (isDarken == "true") {
    toggler.nextElementSibling!.nextElementSibling!.textContent = "dark theme"
    toggler.checked = true
  } else {
    toggler.nextElementSibling!.nextElementSibling!.textContent = "light theme"
    toggler.checked = false
  }
})

toggler?.addEventListener("change", (e) => {
  const isDarken = loadToken("isDark")
  if (isDarken == "true") {
    document.documentElement.classList.remove("dark")
    saveToken("isDark", "false")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "light theme"
  } else {
    document.documentElement.classList.add("dark")
    saveToken("isDark", "true")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "dark theme"
  }
})

// const confirmPassword = document.querySelector(
//   "#confirm-password",
// ) as HTMLInputElement
// const eyeConfirm = document.querySelector(
//   ".eye img.confirm",
// ) as HTMLImageElement

// eyeConfirm.addEventListener("click", (e) =>
//   switchVisibility(confirmPassword, e.target as HTMLImageElement),
// )
