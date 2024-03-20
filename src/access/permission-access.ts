import { error } from "console"

const GeoSwitcher = document.querySelector(".geo-switcher") as HTMLDivElement

GeoSwitcher.addEventListener("click", async () => {
  try {
    navigator.geolocation.getCurrentPosition(
      (pos) => console.log(pos),
      (err) => {
        throw new Error("ff")
      })
  } catch (error) {
    console.log("error happend")
  }
})
