const passwordField = document.querySelector("#password") as HTMLInputElement
const eye = document.querySelector(".eye img") as HTMLImageElement

eye.addEventListener("click", switchVisibility)

function switchVisibility() {
  if (passwordField.type === "password") {
    eye.src = "/src/assets/see.svg"
    passwordField.type = "text"
  } else {
    eye.src = "/src/assets/unsee.svg"
    passwordField.type = "password"
  }
}
export {}
