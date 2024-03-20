import Swal from "sweetalert2"

export const loginToater = (
  congrats: string,
  iconType: "error" | "success" | "warning" | "question" | "info",
  iconColor = "",
) => {
  return Swal.fire({
    text: congrats,
    icon: iconType,
    iconColor,
    backdrop: true,

    allowEscapeKey: false,
    allowOutsideClick: false,
    focusConfirm: true,
  })
}
export const SignupToater = (
  congrats: string,
  iconType: "error" | "success" | "warning" | "question" | "info",
  iconColor = "",
  position: "top-right",
) => {
  return Swal.fire({
    text: congrats,
    icon: iconType,
    iconColor,
    backdrop: true,
    toast: true,
    position,
    allowEscapeKey: false,
    allowOutsideClick: false,
    focusConfirm: true,
  })
}
