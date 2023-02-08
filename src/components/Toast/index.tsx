import { Box, Spinner, Text } from "@chakra-ui/react"
import { useAuth } from "../../contexts/AuthContext"

export const ToastLoadingError = () => {
  const { isLoading } = useAuth()
  return (
    <Box color='white' p={3} bg='blue.500'>
      {isLoading ? (
        <>
          <Spinner />
          <Text> Loading... </Text>
        </>
      ) : (
        <>
            <Text> Error!... </Text>
        </>
      )}
    </Box>
  )
}
