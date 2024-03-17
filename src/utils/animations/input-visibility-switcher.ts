const passwordField = document.querySelector("#password") as HTMLInputElement
const confirmPassword = document.querySelector(
  "#confirm-password",
) as HTMLInputElement
const eye = document.querySelector(".eye img") as HTMLImageElement
const eyeConfirm = document.querySelector(
  ".eye img.confirm",
) as HTMLImageElement

eye.addEventListener("click", (e) =>
  switchVisibility(passwordField, e.target as HTMLImageElement),
)
eyeConfirm.addEventListener("click", (e) =>
  switchVisibility(confirmPassword, e.target as HTMLImageElement),
)

function switchVisibility(
  witchInput: HTMLInputElement,
  witchEye: HTMLImageElement,
) {
  if (witchInput.type === "password") {
    witchEye.src = "/src/assets/see.svg"
    witchInput.type = "text"
  } else {
    witchEye.src = "/src/assets/unsee.svg"
    witchInput.type = "password"
  }
}
