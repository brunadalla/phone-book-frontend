import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import { createStandaloneToast } from '@chakra-ui/toast'
const { ToastContainer } = createStandaloneToast()


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ToastContainer/>
        <App />
    </BrowserRouter>
  </React.StrictMode>
)

