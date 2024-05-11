export const saveTokenCookie = (token: string, value: string) => {
  document.cookie = token + "=" + value + ";httpOnly"
}

export const saveTokenLocal = (token: string, value: string) => {
  localStorage.setItem(token, value)
}
