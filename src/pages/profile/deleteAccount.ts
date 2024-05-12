import { deleteAccount } from "../../api/fetchers/delete/delete-account"
import { deleteUserAccount } from "../../api/authentication-api/delete-account.user"

const DeleteModelAccount = document.querySelector(
  "[data-modal]",
) as HTMLDialogElement
const openModel = document.querySelector("[data-open-modal]")
const closeModel = document.querySelectorAll("[data-close-modal]")
const deleteAccountForm = document.querySelector(
  "#delete-account",
) as HTMLFormElement
const deletAccountBtn = document.querySelector(
  "#delete-account-btn",
) as HTMLButtonElement

deleteAccountForm.addEventListener("submit", (e) => {
  e.preventDefault()
})

openModel?.addEventListener("click", () => {
  DeleteModelAccount.showModal()
})
closeModel.forEach((btn) =>
  btn?.addEventListener("click", () => {
    DeleteModelAccount.close()
  }),
)

deletAccountBtn.addEventListener("click", async () => {
  const { state } = await deleteAccount()
  DeleteModelAccount.close()
  deleteUserAccount(state)
})
