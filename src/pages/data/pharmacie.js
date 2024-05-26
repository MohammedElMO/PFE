import apiClient from "../../api/api-client"
import Cookies from "js-cookie"

const pharmacie = await apiClient.get("/pharmacy/cities", {
  headers: {
    Authorization: Cookies.get("jwtToken"),
  },
})

// export const favoredIds = pharmacie.data.favoredIds

export default pharmacie.data