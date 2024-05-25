// export const loadToken = (token: string) => {
//   const cookies = document.cookie

//   return function get() {
//     const keys = cookies.split(";")[0]
//     const entries = keys.split("=")
//     return [entries[0], entries[1]]
//   }
// }

export const loadTokenFromLocal = (label: string) => {
  return localStorage.getItem(label)
}







