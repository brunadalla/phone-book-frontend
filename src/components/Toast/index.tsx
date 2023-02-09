import { Box, Spinner, Text } from "@chakra-ui/react"
import { MdCancel } from "react-icons/md"

import { useAuth } from "../../contexts/AuthContext"

export const ToastLoadingError = () => {
  const { isLoading } = useAuth()
  return (
    <Box
      p='4'
      bg='gray.50'
      color='gray.900'
      display='flex'
      alignItems='center'
      gap='4'
      borderRadius='8px'
    >
      {isLoading ? (
        <>
          <Spinner
            thickness='2px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='md'
          />
          <Text fontWeight='semibold'> Loading... </Text>
        </>
      ) : (
        <>
          <MdCancel color='red' size='23'/>
          <Text fontWeight='bold'> Invalid email or password! </Text>
        </>
      )}
    </Box>
  )
}
