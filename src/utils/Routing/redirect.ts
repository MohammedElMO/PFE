export const redirect = (to: string) => {
  const link = document.createElement("a")

  link.href = to
  link.click()
}
