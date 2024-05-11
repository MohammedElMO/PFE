export const redirect = (to: string) => {
  const link = document.createElement("a") as HTMLAnchorElement
  link.href = to
  link.click()
}
