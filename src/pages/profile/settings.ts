import "@/styles/setting-togglers.css"

const EditImage = document.querySelector(".edit-avatar") as HTMLDivElement

EditImage.addEventListener("click", UploadAvatar)

function UploadAvatar() {
  const avatarUploader = document.querySelector("#avatar") as HTMLInputElement
  const avatarImg = document.querySelector(".avatar-img") as HTMLImageElement
  avatarUploader.click()

  avatarUploader.addEventListener("change", async (e) => {
    // const path = e.currentTarget?.value
    // avatarImg.src = path
  })
}
