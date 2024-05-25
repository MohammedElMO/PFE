import Cookies from "js-cookie"

import "../../style.css"
import "../../validation/setting-info"
import "./deleteAccount"
import "../../validation/setting-password"
import "../../utils/logIn-out"
import "../../utils/drop-down-controle"

if (!Cookies.get("jwtToken")) {
  window.location.href = "/"
}
