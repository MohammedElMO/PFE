import { loadTokenFromLocal } from "../storage/loadToken"
import { saveTokenLocal } from "../storage/saveToken"

const toggler = <HTMLInputElement>(
  document.querySelector(".toggler")!.firstElementChild!.firstElementChild
)

document.addEventListener("DOMContentLoaded", () => {
  const isDark = loadTokenFromLocal("isDark")

  if (isDark == "true") {
    document.documentElement.classList.add("dark")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "thème sombre"
    toggler.checked = true
  } else {
    document.documentElement.classList.remove("dark")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "thème clair"
    toggler.checked = false
  }
})

console.log(toggler)
toggler.addEventListener("change", () => {
  const isDarken = loadTokenFromLocal("isDark")
  if (isDarken == "true") {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    saveTokenLocal("isDark", "false")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "thème claire"
  } else {
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
    saveTokenLocal("isDark", "true")
    toggler.nextElementSibling!.nextElementSibling!.textContent = "thème sombre"
  }
})
