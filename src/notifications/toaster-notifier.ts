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
    // toast: true,
    // position: "top-right",
    // timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    focusConfirm: true,
  })
}
