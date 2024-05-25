const favorit_btn = document.getElementById("favorite") as HTMLAnchorElement
const favorit_ele = document.getElementById("fav_element") as HTMLDivElement

favorit_ele.style.display = "none"

favorit_btn.addEventListener("mouseenter", () => {
  favorit_ele.style.display = "block"
})

favorit_btn.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!favorit_ele.matches(":hover")) {
      favorit_ele.style.display = "none"
    }
  }, 100)
})

favorit_ele.addEventListener("mouseleave", () => {
  favorit_ele.style.display = "none"
})

const user_icon = document.getElementById("user_icon") as HTMLElement
const user_ele = document.getElementById("user_elem") as HTMLDivElement

user_icon.addEventListener("mouseenter", () => {
  user_ele.style.display = "block"
})
user_icon.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!user_ele.matches(":hover")) {
      user_ele.style.display = "none"
    }
  }, 100)
})
user_ele.addEventListener("mouseleave", () => {
  user_ele.style.display = "none"
})

//mobile logique
const close_btn = document.getElementById("close_menu") as HTMLButtonElement
const open_btn = document.getElementById("open_menu") as HTMLButtonElement
const nave_bar = document.getElementById("mobile_mode") as HTMLDivElement

open_btn.addEventListener("click", () => {
  nave_bar.style.display = "block"
})
close_btn.addEventListener("click", () => {
  nave_bar.style.display = "none"
})
