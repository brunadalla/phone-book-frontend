import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react"
import { BsTelephone, BsEnvelope } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"

import { useAuth } from "../../contexts/AuthContext"
import ImageDash from "../../assets/imageDash.png"
import { useNavigate } from "react-router-dom"

export const Aside = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <Flex
      h='100%'
      w='20%'
      minW='250px'
      p='2% 0 1% 2%'
      flexDirection='column'
      justifyContent='flex-start'
      gap='8%'
      bgGradient='linear(to-b, #76C893, #52B69A, #34a0a4)'
    >
      <VStack
        alignItems='flex-start'
        fontFamily='Poppins'
        fontWeight={600}
        fontSize='5xl'
      >
        <Heading color='gray.900'>PHONE</Heading>
        <Heading color='blue.600'>BOOK</Heading>
      </VStack>

      <Box
        h='30%'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <VStack
          color='white'
          fontFamily='Poppins'
          alignItems='flex-start'
          gap='10px'
        >
          <Text fontSize='xl' fontWeight='semibold'>
            {" "}
            {user.name}{" "}
          </Text>
          <HStack>
            <BsEnvelope />
            <Text> {user.email} </Text>
          </HStack>
          <HStack>
            <BsTelephone />
            <Text> {user.phone} </Text>
          </HStack>
        </VStack>

        <Button
          size='lg'
          display='flex'
          gap='5px'
          p='0'
          bgColor='transparent'
          _hover={{ background: "transparent", color: "white" }}
          onClick={() => handleSignOut()}
        >
          <BiLogOut />
          Logout
        </Button>
      </Box>

      <Img
        src={ImageDash}
        w='250px'
        h='320px'
        alignSelf='flex-end'
        position='absolute'
        bottom='0'
      />
    </Flex>
  )
}
