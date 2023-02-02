import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./styles/theme"
import { Routes } from "./routes"

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Routes />
        </ChakraProvider>
    )
}