import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    green: {
      500: "#DFFDD4",
      600: "#7EF4BB",
      800: "#3DA485",
    },
    gray: {
      50: "#f6f6f7",
      100: "#eee",
      200: "#d4d4d4",
      300: "#9e9ea7",
      900: "#111",
    },
    orange: {
      400: "#F9A85D",
      500: "#EA9343",
    },
    blue: {
      600: "#205CF4",
      700: "#0D369F",
    },
    red: {
      600: "#BE1D1D",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Nunito",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    "2xl": "1.5rem",
    "3xs": "0.875rem",
    "4xs": "2.25rem",
    "5xs": "3rem",
    "6xs": "3.75rem",
    "7xs": "4.5rem",
    "8xs": "6rem",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.900",
      },
    },
  },
})
