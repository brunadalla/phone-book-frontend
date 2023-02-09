import { Button, Flex, FormControl, Heading, Input } from "@chakra-ui/react"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"

import { useContact } from "../../contexts/ContactContext"

export const Filter = () => {
  const [inputValue, setInputValue] = useState("")
  const { searchContact } = useContact()

  return (
    <Flex
      justifyContent='space-between'
      w='100%'
      h='100px'
      borderBottom='2px solid'
      borderBottomColor='blue.600'
      alignItems='center'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='3xl'
        color='blue.600'
        fontWeight='semibold'
      >
        Contacts
      </Heading>
      <FormControl
        display='flex'
        alignItems='flex-end'
        w='45%'
        minW='340px'
        gap='4'
      >
        <Input
          placeholder='Search contact'
          h='40px'
          ml='4'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          h='40px'
          w='100px'
          bgColor='orange.400'
          _hover={{ backgroundColor: "orange.500" }}
          onClick={() => searchContact(inputValue)}
        >
          <BiSearch size='25' color='white' />
        </Button>
      </FormControl>
    </Flex>
  )
}
