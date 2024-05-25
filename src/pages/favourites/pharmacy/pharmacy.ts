import "../../../utils/logIn-out"
import "../../../utils/drop-down-controle"
import "/src/style.css"

import {
  PharmaciesFavT,
  getFavouritePharmacies,
} from "../../../api/fetchers/get/getFavPharmacies"
import { deleteFavPhar } from "../../../api/fetchers/delete/delete-fv-phar"
import { deleteFavUserPhar } from "../../../api/authentication-api/delet-fav-phar.user"

const pharmacies = (await getFavouritePharmacies()) as PharmaciesFavT
const layout = document.querySelector("#layout") as HTMLDivElement
const main = document.querySelector("#main") as HTMLElement
// const lenghter = pharmacies.favoriser.length
const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("fr", {
    day: "2-digit",
    weekday: "short",
    month: "short",
    year: "2-digit",
  })

  return formatter.format(new Date(date))
}
const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("fr")
}

const displayUI = (phar: PharmaciesFavT) => {
  phar?.favoriser.map((p, idx) => {
    const {
      date_favorisation,
      pharmacie: {
        Heure_fermeture,
        Heure_ouverture,
        adresse_email,
        adresse_pharmacie,
        fix_pharmacie,

        lat_pharmacie,
        lot_pharmacie,
        nom_pharmacie,
        ville_pharmacie,
      },
    } = p
    const card = `<div
    class="card flex  flex-col border p-2 border-gray-400 rounded-md shadow-lg overflow-hidden"
  >
    <iframe
      frameborder="1"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      class="rounded w-full"
      src="https://maps.google.com/maps?q=${lat_pharmacie},${lot_pharmacie}&hl=es&z=14&amp;output=embed"
    >
    </iframe>
    <div class="flex justify-between p-3">
      <div class="flex self-end relative">
        <button
          id="choice-${idx}"
          class="z-10 relative inline-flex items-center p-2 text-sm font-medium text-center rounded hover:bg-gray-200"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          id="drop-${idx}"
          class="absolute hidden cursor-pointer -bottom-10 left-0 bg-white shadow-md rounded"
        >
          <div
            class="w-full px-4 py-2 rounded text-sm text-gray-700 hover:text-white hover:bg-red-500"
          >
            Delete
          </div>
        </div>
      </div>
      <div class="border p-1 rounded-md">
        ${formatDate(date_favorisation)}
      </div>
    </div>
    <div class="flex p-2 flex-col">
      <h1 class="text-2xl font-medium">${nom_pharmacie}</h1>
      <p class="font-base text-base text-slate-600">
        située à ${ville_pharmacie},${adresse_pharmacie}
      </p>
    </div>

    <div class="p-4 border flex flex-col gap-2 rounded-sm">
        <span>Email: ${adresse_email}</span>
        <span>Fix: ${fix_pharmacie}</span>
        <span>Ouvre le ${formatTime(Heure_ouverture)}</span>
        <span>Ferme le ${formatTime(Heure_fermeture)}</span>
      </div>
    </div>
  </div>`
    layout.innerHTML += card
  })
}

const run = (phar: PharmaciesFavT) => {
  phar?.favoriser.map((_, idx) => {
    const droper = document.querySelector(`#drop-${idx}`) as HTMLDivElement
    const dotes = document.querySelector(`#choice-${idx}`) as HTMLButtonElement

    dotes.addEventListener("click", () => {
      const isHidden = droper.classList.contains("hidden")
      if (isHidden) {
        droper.classList.remove("hidden")
      } else {
        droper.classList.add("hidden")
      }
    })

    droper.firstElementChild!.addEventListener("click", async () => {
      console.log(pharmacies.favoriser[idx].id_pharmacie)
      const isDeleted = await deleteFavPhar(
        pharmacies.favoriser[idx].id_pharmacie,
      )
      deleteFavUserPhar(isDeleted)
      window.location.reload()
    })
  })
}
if (!Object.entries(pharmacies.favoriser).length) {
  layout.remove()
  main.classList.add(
    "h-screen",

    "flex",
    "items-center",
    "justify-center",
    "flex-col",
    "gap-3",
  )
  // main.innerHTML += `
  // <img src="/src/assets/no-fave-found.jpg" class="size-24" alt="no fav were found">
  // <p>aucun pharmacie favori n'a été trouvé</p>
  // `
}

if (pharmacies) displayUI(pharmacies)

if (pharmacies) run(pharmacies)
