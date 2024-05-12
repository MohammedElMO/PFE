document.getElementById("favorite")!.addEventListener("click", () => {
  document.getElementById("fav_element")!.style.display = "block"
})
document.getElementById("fav_element")!.addEventListener("mouseleave", () => {
  document.getElementById("fav_element")!.style.display = "none"
})

// show user elements
document.getElementById("user_icon")!.addEventListener("click", () => {
  document.getElementById("user_elem")!.style.display = "block"
})
document.getElementById("user_elem")!.addEventListener("mouseleave", () => {
  document.getElementById("user_elem")!.style.display = "none"
})
// mobile navebar
const close_btn = document.getElementById("close_menu")
const open_btn = document.getElementById("open_menu")
const nave_bar = document.getElementById("mobile_mode")
open_btn!.addEventListener("click", () => {
  nave_bar!.style.display = "block"
})
close_btn!.addEventListener("click", () => {
  nave_bar!.style.display = "none"
})
