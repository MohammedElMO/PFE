import { loadTokenFromLocal } from "./storage/loadToken"

export const loadThemeState = () => {
  const isDarken = loadTokenFromLocal("isDark")

  if (isDarken == "true") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  return isDarken
}
