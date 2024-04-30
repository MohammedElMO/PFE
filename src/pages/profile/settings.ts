import "@/styles/setting-togglers.css"
import { getUserProfile } from "../../api/fetchers/get/getUserProfile"
import { loadToken } from "../../utils/local-storage/loadToken"

const EditImage = document.querySelector(".edit-avatar") as HTMLDivElement

// EditImage.addEventListener("click", UploadAvatar)

// function UploadAvatar() {
//   const avatarUploader = document.querySelector("#avatar") as HTMLInputElement
//   const avatarImg = document.querySelector(".avatar-img") as HTMLImageElement
//   avatarUploader.click()

//   avatarUploader.addEventListener("change", async (e) => {
//     // const path = e.currentTarget?.value
//     // avatarImg.src = path
//   })
// }

// const lastName = document.querySelector(".lastName") as HTMLInputElement
// const firstName = document.querySelector(".firstName") as HTMLInputElement

// document.addEventListener("DOMContentLoaded", async () => {
//   const profile = await getUserProfile(loadToken("userId")!)
//   console.log(profile)
//   // const [first, last] = profile?.response.fullName.split(" ")
//   // firstName.value = first
//   // lastName.value = last
// })
