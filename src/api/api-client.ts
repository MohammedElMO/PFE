import axios from "axios"

// axios.defaults.withCredentials = true

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})
