import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { CustomCard } from "../../components/Card"
import { UseGetScreenWidth } from "../../hook"

export const List = () => {
  const [, width] = UseGetScreenWidth()

  const contacts: Array<string> = []

  return (
    <Flex w='100%' flexDirection='column' gap='4' pt='4' color='gray.900'>
      <HStack
        w='100%'
        justifyContent='space-between'
        h='50px'
        fontFamily='Poppins'
        fontWeight='medium'
      >
        <HStack gap='12'>
          <Text> Recent </Text>
          <Text> A - B</Text>
        </HStack>
        {width >= 768 ? (
          <Button
            h='100%'
            bgColor='green.600'
            _hover={{ bgColor: "green.800" }}
          >
            + New Contact
          </Button>
        ) : (
          <Button
            h='100%'
            p='6'
            bgColor='green.600'
            _hover={{ bgColor: "green.800" }}
          >
            + New 
          </Button>
        )}
      </HStack>

      <Wrap>
        {contacts.map((contact) => (
          <WrapItem>
            {/*  <CustomCard contact={contact} key={contact.id}/> */}
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
