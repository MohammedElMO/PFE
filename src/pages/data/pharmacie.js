import { InfoToast } from "../../notifications/toaster-notifier"
import apiClient from "../../api/api-client"
import Cookies from "js-cookie"


const fetchPharmacies = async () => {
try {
  const pharmacie = await apiClient.get("/pharmacy/cities", {
    // headers: {
    //   Authorization: Cookies.get("jwtToken"),
    // },
  })
  return pharmacie.data
} catch (error) {
  console.log(error)
  InfoToast("aucune ville n'a été trouvée","info","top-right","",true)
}
  
}

export const pharmacie = await fetchPharmacies()

export default pharmacie