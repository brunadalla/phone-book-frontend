import { Button, Flex, FormControl, Input } from "@chakra-ui/react"
import { BiSearch } from "react-icons/bi"

export const FilterMobile = () => {
  return (
    <Flex
      justifyContent='space-between'
      w='100%'
      h='80px'
      borderBottom='2px solid'
      borderBottomColor='blue.600'
      alignItems='center'
    >
      <FormControl display='flex' alignItems='flex-end' w='100%' gap='4'>
        <Input name='search' placeholder='Search contact' h='40px' />

        <Button
          h='40px'
          w='40px'
          p='0'
          bgColor='orange.400'
          _hover={{ backgroundColor: "orange.500" }}
        >
          <BiSearch size='20' color='white' />
        </Button>
      </FormControl>
    </Flex>
  )
}
