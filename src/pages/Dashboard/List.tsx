import { Box, Button, Flex, HStack, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { CustomCard } from "../../components/Card"

export const List = () => {
  const contacts: Array<string> = []

  return (
    <Flex>

      <HStack>
        <Box>
          <Text> Recent </Text>
          <Text> A - B</Text>
        </Box>
        <Button> + New Contact </Button>
      </HStack>

      <Wrap>
        {contacts.map(contact => <WrapItem>
           {/*  <CustomCard contact={contact} key={contact.id}/> */}
        </WrapItem>)}
      </Wrap>

    </Flex>
  )
}
