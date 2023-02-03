import { Box, Button, Flex, Heading, HStack, Img, Text, VStack } from "@chakra-ui/react"

import { useAuth } from "../../contexts/AuthContext"
import Background from "../../assets/background.png"

export const Aside = () => {
  const { user } = useAuth()

  return (
    <Flex
      w='100%'
      flexDirection='column'
      justify-content='space-between'
      gap='5px'
    >
      <VStack>
        <Heading
          fontFamily='Poppins'
          fontWeight={600}
          fontSize='5xl'
          color='gray.900'
        >
          PHONE
        </Heading>
        <Heading
          fontFamily='Poppins'
          fontWeight={600}
          fontSize='5xl'
          color='blue.600'
        >
          BOOK
        </Heading>
      </VStack>

      <Box>
        <VStack>
          <Text> {user.name} </Text>
          <HStack>
            <Text> {user.email} </Text>
          </HStack>
          <HStack>
            <Text> {user.phone} </Text>
          </HStack>
        </VStack>

        <Button>
            Logout
        </Button>
      </Box>

      <Img
          src={Background}
        
        />
    </Flex>
  )
}
