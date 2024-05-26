import Cookies from "js-cookie"

import "../../style.css"
import "../../validation/setting-info"
import "./deleteAccount"
import "../../validation/setting-password"
import "../../utils/logIn-out"
import "../../utils/drop-down-controle"
import { settings } from "../../validation/setting-info"

if (!Cookies.get("jwtToken")) {
  window.location.href = "/"
}

const name = document.querySelector(".name") as HTMLHeadingElement

name.textContent = "Bonjoure ,"  + settings.username
