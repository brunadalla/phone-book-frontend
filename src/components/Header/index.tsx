import { Flex, Heading, HStack, Text } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Flex w='100%' flexDirection='column' justify-content="space-between" gap='5px'>
      <HStack>
        <Heading fontFamily='Poppins' fontWeight={600} fontSize='5xl' color='gray.900' >PHONE</Heading>
        <Heading fontFamily='Poppins' fontWeight={600} fontSize='5xl' color='blue.600' >BOOK</Heading>
      </HStack>

      <Text fontFamily='Nunito' fontWeight={400} fontSize='2xl' color='gray.900' w='70%'>
        An easy and cute online
        <Text fontWeight={700}> phone agenda </Text>
      </Text>
    </Flex>
  )
}
