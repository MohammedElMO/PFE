import see from "/src/assets/see.svg"
import unsee from "/src/assets/unsee.svg"
const passwordField = document.querySelector("#password") as HTMLInputElement

const eye = document.querySelector(".eye img") as HTMLImageElement

eye.addEventListener("click", (e) =>
  switchVisibility(passwordField, e.target as HTMLImageElement),
)
export function switchVisibility(
  witchInput: HTMLInputElement,
  witchEye: HTMLImageElement,
) {
  if (witchInput.type === "password") {
    witchEye.src = see
    witchInput.type = "text"
  } else {
    witchEye.src = unsee
    witchInput.type = "password"
  }
}
