import pharmacie from "../data/pharmacie"
import "../../utils/logIn-out"
import apiClient from "../../api/api-client"
import Cookies from "js-cookie"
import { InfoToast } from "../../notifications/toaster-notifier"


let favoredIds

const getIds = async () => {
  return await apiClient.get("/pharmacy/favouritesIds", {
    headers: {
      Authorization: Cookies.get("jwtToken"),
    },
  })
}

if (Cookies.get("jwtToken")) {
  const res = await getIds()
  favoredIds = res.data
}
let map
let directionsManager

// Select elements from the DOM
const listCitys = document.querySelector("#list_search")
const btn_search = document.querySelector("#btn_city")
const input_search = document.querySelector("#input_city")
const infoDiv = document.querySelector("#info_div")
console.log(listCitys)

async function initMap() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude

    map = new Microsoft.Maps.Map("#myMap", {
      center: new Microsoft.Maps.Location(lat, long),
      zoom: 10,
      showMapTypeSelector: false,
      showDashboard: false,
    })
  })
}

;(async function loadCityes() {
  const citys = Object.keys(pharmacie) // Move citys declaration here for better scope

  // Populate the city list
  for (let i = 0; i < citys.length; i++) {
    listCitys.innerHTML += `<li data-citys="${citys[i]}" class='cursor-pointer'>${citys[i]}</li>`
  }

  // Show city list on input click
  input_search.addEventListener("click", () => {
    listCitys.style.display = "block"
  })

  // Handle city selection
  listCitys.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      input_search.value = e.target.dataset.citys
      listCitys.style.display = "none"
    }
  })

  // Handle search button click
  btn_search.addEventListener("click", () => {
    const selectedCity = input_search.value
    if (selectedCity && pharmacie[selectedCity]) {
      const pharmacies = pharmacie[selectedCity]
      displayPharmacies(pharmacies, selectedCity)
    } else {
      console.error(`City not found: ${selectedCity}`)
    }
  })
})()

// Display pharmacies on the map
function displayPharmacies(pharmacies, city) {
  map.entities.clear() // Clear previous pushpins
  Object.keys(pharmacies).forEach((pharmacy) => {
    const location = new Microsoft.Maps.Location(
      pharmacies[pharmacy].lat,
      pharmacies[pharmacy].long,
    )
    const pushpin = new Microsoft.Maps.Pushpin(location, {
      title: pharmacies[pharmacy].name,
      icon: "/src/assets/pin.jpeg",
    })

    // Add click event for each pushpin
    Microsoft.Maps.Events.addHandler(pushpin, "click", function (e) {
      const clickedPharmacy = pharmacies[pharmacy]
      showInfoDiv(clickedPharmacy, city)
    })

    map.entities.push(pushpin) // Add pushpin to the map
  })

  // Set map view to fit all pushpins
  const bounds = Microsoft.Maps.LocationRect.fromLocations(
    Object.values(pharmacies).map(
      (ph) => new Microsoft.Maps.Location(ph.lat, ph.long),
    ),
  )
  map.setView({ bounds: bounds })
}

// Show pharmacy information in the info div
function showInfoDiv(pharmacy, city) {
  const pharmacyUrl = `/src/pages/pharmacy/pharmacy_page.html?city=${city}&id=${pharmacy.id}`
  let closingTime = pharmacy.heure_fermeture.split(":")
  let date = new Date()
  let heure = parseInt(closingTime[0], 10)
  let statue = "fermé"
  if (heure >= date.getHours()) {
    statue = "ouvrir"
  }
  infoDiv.innerHTML = `
        <div class="flex justify-between items-center">
        <h3 class='font-bold my-2'>${pharmacy.name}</h3>
        <div class="favorit">
        <i class="fa-regular fa-star cursor-pointer"></i>
        </div>
        </div>
        <p>Address : <span class="font-light">${pharmacy.add}</span> </p>
        <p>Phone : <span class="font-light">${pharmacy.phone}</span></p>
        <p>Statue : <span class="font-light ${statue == "ouvrir" ? "text-green-500" : "text-red-500"} ">${statue}</span></p>
        <div class="w-full flex gap-3 mt-5 mb-1">  
        <i class="fa-solid fa-route rout w-1/2 cursor-pointer text-center py-1 items-center rounded bg_blue_main text-white "></i>
        <a href='${pharmacyUrl}' target='_blank' class="text-center w-1/2 py-1 bg-gray-200 border rounded "><i class="fa-regular fa-compass w-1/2 text-center rounded"></i></a>
        </div>
    `
  infoDiv.style.display = "block"

  if (favoredIds)
    if (favoredIds.find((p) => p.id_pharmacie === pharmacy.id)) {
      document.querySelector(".favorit").style.color = "yellow"
    }

  liker(pharmacy.id)

  // Handle click event for route button
  document.querySelector(".rout").addEventListener("click", () => {
    loadDirections(pharmacy)
  })

  // Add event listener to hide info div when search input is focused
  input_search.addEventListener("focus", () => {
    infoDiv.style.display = "none"
    clearDirections()
  })
}

// Load and display directions using Microsoft Maps Directions module
function loadDirections(pharmacy) {
  Microsoft.Maps.loadModule("Microsoft.Maps.Directions", function () {
    if (!directionsManager) {
      directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map)
    } else {
      directionsManager.clearAll()
    }
    // get lat and long of user
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      const start = new Microsoft.Maps.Directions.Waypoint({
        location: new Microsoft.Maps.Location(lat, lng),
      })
      directionsManager.addWaypoint(start)

      // Create end waypoint using pharmacy coordinates
      const end = new Microsoft.Maps.Directions.Waypoint({
        location: new Microsoft.Maps.Location(pharmacy.lat, pharmacy.long),
      })
      directionsManager.addWaypoint(end)

      // Set the render options for directions
      directionsManager.setRenderOptions({
        itineraryContainer: "#directionsItinerary",
      })

      // Calculate directions
      directionsManager.calculateDirections()
    })
  })
}
function clearDirections() {
  if (directionsManager) {
    directionsManager.clearAll()
  }
}

;(function getloc() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    console.log(lat, lng)
  })
})()

// Initialize the map when the window loads
window.onload = function () {
  initMap()
}

async function likePharmacy(id) {
  try {
    apiClient.post(
      "/pharmacies/favourites/",
      {
        pharmacieId: id,
      },
      {
        headers: {
          Authorization: Cookies.get("jwtToken"),
        },
      },
    )
  } catch (error) {
    InfoToast("une erreur s'est produite", "warning", "top-right", "", true)
  }
}
async function dislikePharmacy(id) {
  try {
    await apiClient.delete(
      "/pharmacies/favourites/" + id,

      {
        headers: {
          Authorization: Cookies.get("jwtToken"),
        },
      },
    )
  } catch (error) {
    InfoToast("une erreur s'est produite", "warning", "top-right", "", true)
  }
}

function liker(pId) {
  document.querySelector(".favorit").addEventListener("click", async () => {
    // pharmacy.id
    if (Cookies.get("jwtToken")) {
      if (favoredIds && !favoredIds.find((p) => p.id_pharmacie === pId)) {
        likePharmacy(pId).then(async () => {
          favoredIds = (await getIds()).data
          document.querySelector(".favorit").style.color = "yellow"
        })
      } else {
        dislikePharmacy(pId).then(async () => {
          favoredIds = (await getIds()).data
          document.querySelector(".favorit").style.color = "black"
        })
      }
    } else {
      InfoToast(
        "vous ne pouvez pas effectuer cette action tant que vous n'êtes pas authentifié",
        "info",
        "center",
      )
    }
  })
}
