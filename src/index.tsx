import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { createStandaloneToast } from "@chakra-ui/toast"

import { App } from "./App"
import { AppProvider } from "./contexts"

const { ToastContainer } = createStandaloneToast()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
