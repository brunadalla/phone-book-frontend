import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react"

import { CustomCard } from "../../components/Card"
import { CardMobile } from "../../components/Card/CardMobile"
import { UseGetScreenWidth } from "../../hook"

interface IContact {
  id: string
  name: string
  phone: string
  email: string
  createdAt: Date
}

interface IContactListProps {
  contacts: IContact[]
}

export const List = ({ contacts }: IContactListProps) => {
  const [, width] = UseGetScreenWidth()

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
            _hover={{ bgColor: "green.800", color: "white" }}
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

      <Grid
        h={["50vh", "50vh", "65vh", "65vh"]}
        overflowY='scroll'
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(4, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={["1", "1", "4", "4"]}
      >
        {contacts.map((contact) => (
          <GridItem>
            {width >= 768 ? (
              <CustomCard
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                date={contact.createdAt}
                key={contact.id}
              />
            ) : (
              <CardMobile
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                date={contact.createdAt}
                key={contact.id}
              />
            )}
          </GridItem>
        ))}
      </Grid>
    </Flex>
  )
}
