export const redirect = (to: string) => {
  const link = document.createElement("a") as HTMLAnchorElement
  // link.onclick = (e) => e.preventDefault()
  link.href = to
  link.click()
}
