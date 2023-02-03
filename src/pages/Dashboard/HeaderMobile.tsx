import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"

import { BsTelephone, BsEnvelope } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { HiOutlineMenu } from "react-icons/hi"

import { useAuth } from "../../contexts/AuthContext"

export const HeaderMobile = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  return (
    <Flex
      w='100%'
      h='18%'
      minH='120px'
      p='4'
      justifyContent='space-between'
      bgGradient='linear(to-r, #76C893, #52B69A, #34a0a4)'
    >
      <VStack
        alignItems='flex-start'
        fontFamily='Poppins'
        fontWeight={600}
        fontSize='3xl'
      >
        <Heading color='gray.900'>PHONE</Heading>
        <Heading color='blue.600'>BOOK</Heading>
      </VStack>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HiOutlineMenu />}
          variant='outline'
        />
        <MenuList fontFamily='Poppins'>
          <MenuItem fontWeight='semibold'>{user.name}</MenuItem>
          <MenuItem icon={<BsEnvelope />}>{user.email}</MenuItem>
          <MenuItem icon={<BsTelephone />}>{user.phone}</MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<BiLogOut color='blue.600' />}
            onClick={() => handleSignOut()}
            color='blue.600'
            _hover={{ fontWeight: "semibold" }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
