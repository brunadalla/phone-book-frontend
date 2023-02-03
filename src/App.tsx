import { ChakraBaseProvider } from "@chakra-ui/react"

import { Router } from "./routes"
import { theme } from "./styles/theme"

export const App = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router />
    </ChakraBaseProvider>
  )
}
