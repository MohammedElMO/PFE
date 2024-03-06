import Swal from "sweetalert2"

//   Swal.fire({
//     text: "You've Log in successfully!",
//     icon: "success",
//     iconColor: "#5e4bf1dd",
//     backdrop: true,
//     // toast: true,
//     // position: "top-right",
//     timerProgressBar: true,
//     allowEscapeKey: true,
//     focusConfirm: true,
//   })

export const loginSuccessToater = () => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })
  toast.fire({
    icon: "success",
    title: "You've Log in successfully!",
  })
}
