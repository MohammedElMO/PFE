import {
  MedicineFavT,
  getFavouriteMedicines,
} from "../../api/fetchers/get/getFavMedicies"
import "/src/style.css"
import "../../utils/drop-down-controle"
import "../../utils/logIn-out"
import { deleteFavUserMed } from "../../api/authentication-api/delete-fav-med.user"
import { deleteMedFav } from "../../api/fetchers/delete/delete-fav-med"

const med = await getFavouriteMedicines()
const layout = document.querySelector("#layout") as HTMLDivElement
const main = document.querySelector("#main") as HTMLElement

const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("fr", {
    day: "2-digit",
    weekday: "short",
    month: "narrow",
    year: "2-digit",
  })

  return formatter.format(new Date(date))
}

const displayUI = (mede: MedicineFavT) => {
  mede.Preferer.map((m, idx) => {
    m.medicament.Contain.map((p) => {
      const {
        Heure_fermeture,
        // Heure_ouverture,
        adresse_pharmacie,
        fix_pharmacie,
        lat_pharmacie,
        lot_pharmacie,
        nom_pharmacie,
        ville_pharmacie,
      } = p.pharmacie

      const card = `<div
    id="card-${idx}"
    class="bg-white self-start relative border p-3 flex flex-col justify-evenly gap-10 rounded-lg shadow-lg "
    >
    <div class="flex justify-between items-center">
      <span class="bg-gray-100 p-1.5 rounded-lg">${formatDate(m.date_preferation)}</span>
      <h1 class="text-center cursor-pointer font-medium text-2xl">
        ${m.medicament.nom_medicament}
      </h1>
      <span
        id="show-more-${idx}"
        class="cursor-pointer hover:bg-gray-300/80 p-1 transition-transform rounded-sm rotate-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </span>
    </div>
    <p class="text-left text-pretty">
     ${m.medicament.description_medicament}
    </p>
    <span class="spliter relative text-center text-gray-400">avec</span>
    
    <div
      class="sub-info justify-evenly rounded flex justify-self-stretch h-full font-pop items-center"
    >
      <div class="flex flex-col text-sm gap-1">
        <span class="text-slate-400">Tva </span>
        <span class="text-slate-700 text-base">${m.medicament.tva} </span>
      </div>
      <div class="flex flex-col text-sm gap-1">
        <span class="text-slate-400">dasage </span>
        <span class="text-slate-700 text-base">${m.medicament.dosage} </span>
      </div>
      <div class="flex flex-col text-sm gap-1">
        <span class="text-slate-400">Prix </span>
        <span class="text-slate-700 text-base">${m.medicament.prix}DH </span>
      </div>
      <div class="flex flex-col text-sm gap-1">
        <span class="text-slate-400">type </span>
        <span class="text-slate-700 text-base">${m.medicament.type}</span>
      </div>
      <div class="flex self-end relative">
      <button
        id="choice-${idx}"
        class="z-10  relative inline-flex items-center p-2 text-sm font-medium text-center rounded hover:bg-gray-200 "
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
      <div id="drop-${idx}" class="absolute hidden cursor-pointer -bottom-10 left-0 bg-white shadow-md rounded">
      <div
        class="w-full px-4 py-2 rounded text-sm text-gray-700 hover:text-white hover:bg-red-500"
      >
        Delete
      </div>
    </div>
    </div>
    </div>
    <div id="more-info-${idx}">
  <div class="pharmacie flex flex-col gap-2 w-full p-2">
    <section class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="drop-details-${idx}"
          aria-expanded="true"
          aria-haspopup="true"
        >
         ${nom_pharmacie}
          <svg
            class="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="shadow-md p-2" id="detailer-${idx}">
        <iframe
          frameborder="1"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          class="rounded w-full"
          src="https://maps.google.com/maps?q=${lat_pharmacie},${lot_pharmacie}&hl=es&z=14&amp;output=embed"
        >
        </iframe>
        <div>
          <div class="mt-2 px-2">
            <span
              class="text-sm text-gray-500 flex gap-2 items-center"
            >
              <span
                class="bg-green-400 size-0.5 p-2 rounded-full ring-2 ring-green-200"
              ></span>
              Détails de la pharmacie:</span
            >
            <div class="mt-2">
              <h2 class="font-medium text-base">Pharmacie A</h2>
              <div
                class="flex gap-2 items-center text-sm text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span>${new Date(Date.now()).getHours() > new Date(Heure_fermeture).getHours() ? "Fermer" : "Ouvert"} (ferme à ${new Date(Heure_fermeture).toLocaleTimeString("fr")} )</span>
              </div>
              <div
                class="flex gap-2 items-center text-sm text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span> ${ville_pharmacie},${adresse_pharmacie} </span>
                <span> Fix:${fix_pharmacie}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
        </div>`
      layout.innerHTML += card
    })
  })
}

const deleteMedicine = (mede: MedicineFavT) => {
  mede.Preferer.map((_, idx) => {
    const dropDetailsBtn = document.querySelector(
      `#drop-details-${idx}`,
    ) as HTMLButtonElement
    const detailer = document.querySelector(
      `#detailer-${idx}`,
    ) as HTMLDivElement
    const droper = document.querySelector(`#drop-${idx}`) as HTMLDivElement
    const dotes = document.querySelector(`#choice-${idx}`) as HTMLButtonElement
    console.log(dropDetailsBtn, detailer, droper, dotes)
    dropDetailsBtn.addEventListener("click", () => {
      const isHidden = detailer.classList.contains("hidden")
      if (isHidden) {
        detailer.classList.remove("hidden")
      } else {
        detailer.classList.add("hidden")
      }
    })
    dotes.addEventListener("click", () => {
      const isHidden = droper.classList.contains("hidden")
      if (isHidden) {
        droper.classList.remove("hidden")
      } else {
        droper.classList.add("hidden")
      }
    })

    droper.firstElementChild!.addEventListener("click", async () => {
      const isDeleted = await deleteMedFav(
        med!.Preferer[idx].medicament.id_medicament,
      )
      deleteFavUserMed(isDeleted)
      window.location.reload()
    })

    const ShowMore = document.querySelector(
      `#show-more-${idx}`,
    ) as HTMLSpanElement
    const cardDetails = document.querySelector(
      `#more-info-${idx}`,
    ) as HTMLDivElement

    ShowMore.addEventListener("click", () => {
      if (cardDetails.classList.contains("hidden")) {
        cardDetails.classList.remove("hidden")
      } else {
        cardDetails.classList.add("hidden")
      }
      if (ShowMore.classList.contains("rotate-90")) {
        ShowMore.classList.add("-rotate-90")
        ShowMore.classList.remove("rotate-90")
      } else {
        ShowMore.classList.remove("-rotate-90")
        ShowMore.classList.add("rotate-90")
      }
    })
  })
}

if (med?.Preferer.length === 0) {
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
  // <p>aucun médicament favori n'a été trouvé</p>
  // `
}

if (med) displayUI(med)
if (med) deleteMedicine(med)
