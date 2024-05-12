import Cookies from "js-cookie"
// protecting routes

let signUp: HTMLLIElement | null = null
let logIn: HTMLLIElement | null = null
let settings: HTMLLIElement | null = null
let LogOut: HTMLLIElement | null = null

const selectElems = () => {
  if (window.matchMedia("(width < 780px)").matches) {
    signUp = document.querySelector(".left-side #sign-up") as HTMLLIElement
    logIn = document.querySelector(".left-side #log-in") as HTMLLIElement
    settings = document.querySelector(".left-side #settings") as HTMLLIElement
    LogOut = document.querySelector(".left-side #log-out") as HTMLLIElement
  } else {
    signUp = document.querySelector("#sign-up") as HTMLLIElement
    logIn = document.querySelector("#log-in") as HTMLLIElement
    settings = document.querySelector("#settings") as HTMLLIElement
    LogOut = document.querySelector("#log-out") as HTMLLIElement
  }
}

selectElems()

const authenticating = () => {
  selectElems()

  let isLogIn = Cookies.get("jwtToken")
  if (isLogIn) {
    if (signUp) signUp.classList.add("hidden")
    if (logIn) logIn.classList.add("hidden")
    if (settings) settings.classList.remove("hidden")
    if (LogOut) LogOut.classList.remove("hidden")
  } else {
    if (signUp) signUp.classList.remove("hidden")
    if (logIn) logIn.classList.remove("hidden")
    if (settings) settings.classList.add("hidden")
    if (LogOut) LogOut.classList.add("hidden")
  }
  if (LogOut)
    LogOut.addEventListener("click", () => {
      Cookies.remove("jwtToken")
      window.location.reload()
      window.location.pathname = "/"
    })
}
authenticating()

window.addEventListener("resize", authenticating)
