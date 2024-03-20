import "../styles/utils.css"

const darkMode = document.querySelector("#dark-theme") as HTMLInputElement
const lightMode = document.querySelector("#light-theme") as HTMLInputElement

console.log(darkMode)
document.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("isDark")
  if (isDark === "true") {
    document.documentElement.classList.add("dark")
    darkMode.checked = true
    darkMode.parentElement!.parentElement!.parentElement!.classList.add(
      "selected-theme",
    )
  } else {
    console.log(document.documentElement.classList.remove("dark"))

    lightMode.parentElement!.parentElement!.parentElement!.classList.add(
      "selected-theme",
    )
    lightMode.checked = true
  }
})

darkMode.addEventListener("click", (e) => {
  document.documentElement.classList.add("dark")
  localStorage.setItem("isDark", "true")
  darkMode.parentElement!.parentElement!.parentElement!.classList.add(
    "selected-theme",
  )
  lightMode.parentElement!.parentElement!.parentElement!.classList.remove(
    "selected-theme",
  )
})

lightMode.addEventListener("click", (e) => {
  localStorage.setItem("isDark", "false")
  document.documentElement.classList.remove("dark")
  lightMode.parentElement!.parentElement!.parentElement!.classList.add(
    "selected-theme",
  )
  darkMode.parentElement!.parentElement!.parentElement!.classList.remove(
    "selected-theme",
  )
})
