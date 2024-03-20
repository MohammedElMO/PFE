import { loadToken } from "./local-storage/loadToken"

export const loadThemeState = () => {
  const isDarken = loadToken("isDark")

  if (isDarken == "true") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  return isDarken
}
