import axios from "axios"

export const api = axios.create({
  baseURL: "https://phone-book-deploy.onrender.com/",
})
