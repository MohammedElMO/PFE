import "../../utils/logIn-out.ts"
import "../../utils/drop-down-controle.ts"
import apiClient from "../../api/api-client.ts"
import Cookies from "js-cookie"
import { InfoToast } from "../../notifications/toaster-notifier.ts"
type Pharmacy = {
  id_pharmacie: number
  nom_pharmacie: string
  ville_pharmacie: string
  adresse_pharmacie: string
  adresse_email: string
  fix_pharmacie: string
  lat_pharmacie: number
  lot_pharmacie: number
  Heure_ouverture: string
  Heure_fermeture: string
  id_creater_pharmacie: number
  Contain: {
    medicament: {
      id_medicament: number
      nom_medicament: string
      dosage: string
      description_medicament: string
      type: string
      tva: number
      prix: number
    }
  }[]
}
const pharmacyUrl = new URLSearchParams(window.location.search)
const pharmacyId = pharmacyUrl.get("id")
let medicineIds = await getMedicineFavIds()

async function likeMedicine(id: string | number) {
  try {
    await apiClient.post(
      "/medicines/favourites/",
      {
        medicineId: id,
      },
      {
        headers: {
          Authorization: Cookies.get("jwtToken"),
        },
      },
    )
    medicineIds = await getMedicineFavIds()
  } catch (error) {
    InfoToast("une erreur s'est produite", "warning", "top-right", "", true)
  }
}
async function dislikeMedicine(id: string | number) {
  try {
    await apiClient.delete("/medicines/favourites/" + id, {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })
    medicineIds = await getMedicineFavIds()
  } catch (error) {
    InfoToast("une erreur s'est produite", "warning", "top-right", "", true)
  }
}
async function getMedicineFavIds() {
  try {
    const res = await apiClient.get<
      {
        id_medicament: number
      }[]
    >("/medicines/favourites/ids", {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })
    return res.data
  } catch (error) {
    InfoToast("une erreur s'est produite", "warning", "top-right", "", true)
  }
}

const getPharmacy = async () => {
  try {
    const res = await apiClient.get<Pharmacy>("/pharmacy/" + pharmacyId, {
      headers: {
        Authorization: Cookies.get("jwtToken"),
      },
    })

    return res.data
  } catch (error) {
    InfoToast("une erreur s'est produite", "error", "center")
  }
}

const pharmacie = (await getPharmacy()) as Pharmacy

const displayUi = () => {
  document.querySelector(".pharmacy_name")!.innerHTML = pharmacie.nom_pharmacie
  document.querySelector(".pharmacy_address")!.innerHTML =
    pharmacie.adresse_pharmacie
  document.querySelector(".phone_pharmacy")!.innerHTML = pharmacie.fix_pharmacie

  let closingTime = pharmacie.Heure_fermeture.split(":")
  let date = new Date()
  let heure = parseInt(closingTime[0], 10)
  let statue = "fermé"
  if (date.getHours() < heure) {
    statue = "ouvrir"
  }
  document.querySelector(".pharmacy_statue")!.innerHTML = statue
  if (statue == "fermé") {
    ;(
      document.querySelector(".pharmacy_statue") as HTMLSpanElement
    ).style.color = "red"
  }
  if (!pharmacie.Contain.length) {
    document.querySelector(".medicament")!.className =
      "flex items-center justify-center medicament"
    document.querySelector(".medicament")!.innerHTML =
      "<p>pas de medicament dans cet pharmacie</p>"
  } else {
    pharmacie.Contain.map(({ medicament }) => {
      document.querySelector(".medicament")!.innerHTML += `
    <div>
    <div
      class="flex relative flex-col font-pop text-center border h-fit rounded-lg shadow-lg mx-4 my-4 p-3"
    >
    <div
    id="favorit-${medicament.id_medicament}"
    class="absolute"
  >
  <i  class="fa-regular fa-star star cursor-pointer"></i>
  </div>

      <h3 class="medicament_name uppercase font-bold text-gray-900 text-xl">
        ${medicament["nom_medicament"]}
      </h3>
      <p>
        <span class="font-bold uppercase">Dosage : </span
        ><span class="dosage_medicament text-zinc-600 leading-7"
          > ${medicament["dosage"]}</span
        >
      </p>
      <p>
        <span class="font-bold uppercase">type : </span
        ><span class="type_medicament text-zinc-600 leading-7"> ${medicament["type"]}</span>
      </p>
      <p class="description_medicament text-center text-zinc-600 leading-7">
      ${medicament["description_medicament"]}</p>
    </div>
  </div>
    `
    })
  }
}
displayUi()

const fn = (
  data: {
    medicament: {
      id_medicament: number
      nom_medicament: string
      dosage: string
      description_medicament: string
      type: string
      tva: number
      prix: number
    }
  }[],
) => {
  data.map(({ medicament: { id_medicament } }) => {
    const star = document.querySelector(
      `#favorit-${id_medicament}`,
    ) as HTMLDivElement

    if (medicineIds?.find((m) => m.id_medicament === id_medicament)) {
      star.style.color = "yellow"
    }

    star.addEventListener("click", async () => {
      if (!medicineIds?.find((m) => m.id_medicament === id_medicament)) {
        likeMedicine(id_medicament)
          .then(() => {
            star.style.color = "yellow"
          })
          .catch(() => {
            star.style.color = "black"
          })
      } else {
        dislikeMedicine(id_medicament)
          .then(() => {
            star.style.color = "black"
          })
          .catch(() => {
            star.style.color = "yellow"
          })
      }
    })
  })
}
fn(pharmacie.Contain)

const search_medicament = document.querySelector(
  "#search_medicament",
) as HTMLInputElement

search_medicament.addEventListener("input", (e) => {
  const input = e.target as HTMLInputElement

  if (!input.value) {
    document.querySelector(".medicament")!.innerHTML = ""
    pharmacie.Contain.map(({ medicament }) => {
      document.querySelector(".medicament")!.innerHTML += `
    <div>
    <div
      class="flex relative flex-col font-pop text-center border h-fit rounded-lg shadow-lg mx-4 my-4 p-3"
    >
    <div
    id="favorit-${medicament.id_medicament}"
    class="absolute"
  >
  <i  class="fa-regular fa-star star cursor-pointer"></i>
  </div>

      <h3 class="medicament_name uppercase font-bold text-gray-900 text-xl">
        ${medicament["nom_medicament"]}
      </h3>
      <p>
        <span class="font-bold uppercase">Dosage : </span
        ><span class="dosage_medicament text-zinc-600 leading-7"
          > ${medicament["dosage"]}</span
        >
      </p>
      <p>
        <span class="font-bold uppercase">type : </span
        ><span class="type_medicament text-zinc-600 leading-7"> ${medicament["type"]}</span>
      </p>
      <p class="description_medicament text-center text-zinc-600 leading-7">
      ${medicament["description_medicament"]}</p>
    </div>
  </div>
    `
    })
    fn(pharmacie.Contain)
  }
  const phars = [...pharmacie.Contain].filter((m) =>
    m.medicament.nom_medicament
      .toLocaleLowerCase()
      .includes(input.value.toLocaleLowerCase()),
  )

  if (phars.length === 0) {
    document.querySelector(".medicament")!.innerHTML =
      "<p>pas de medicament dans cet pharmacie</p>"
  } else {
    document.querySelector(".medicament")!.innerHTML = ""

    phars.map(({ medicament }) => {
      document.querySelector(".medicament")!.innerHTML += `
      <div>
      <div
        class="flex relative flex-col font-pop text-center border h-fit rounded-lg shadow-lg mx-4 my-4 p-3"
      >
      <div
      id="favorit-${medicament.id_medicament}"
      class="absolute"
    >
    <i  class="fa-regular fa-star star cursor-pointer"></i>
    </div>
  
        <h3 class="medicament_name uppercase font-bold text-gray-900 text-xl">
          ${medicament["nom_medicament"]}
        </h3>
        <p>
          <span class="font-bold uppercase">Dosage : </span
          ><span class="dosage_medicament text-zinc-600 leading-7"
            > ${medicament["dosage"]}</span
          >
        </p>
        <p>
          <span class="font-bold uppercase">type : </span
          ><span class="type_medicament text-zinc-600 leading-7"> ${medicament["type"]}</span>
        </p>
        <p class="description_medicament text-center text-zinc-600 leading-7">
        ${medicament["description_medicament"]}</p>
      </div>
    </div>
      `
    })
    fn(phars)
  }
})
