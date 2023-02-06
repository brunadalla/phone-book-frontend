import { Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react"

import { CustomCard } from "../../components/Card"
import { CardMobile } from "../../components/Card/CardMobile"
import ModalCreateContact from "../../components/Modal/ModalCreateContact"
import { useContact } from "../../contexts/ContactContext"
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
  const { isAlphabeticalOrder, setIsAlphabeticalOrder } = useContact()
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
          <Text
            color={isAlphabeticalOrder ? "gray.900" : "blue.600"}
            _hover={{ color: "blue.700", cursor: "pointer" }}
            onClick={() => setIsAlphabeticalOrder(false)}
          >
            {" "}
            Recent{" "}
          </Text>
          <Text
            color={isAlphabeticalOrder ? "blue.600" : "gray.900"}
            _hover={{ color: "blue.700", cursor: "pointer" }}
            onClick={() => setIsAlphabeticalOrder(true)}
          >
            {" "}
            A - B
          </Text>
        </HStack>
        <ModalCreateContact />
      </HStack>

      {width < 768 ? (
        <Flex
          h='50vh'
          overflowY='scroll'
          gap='1'
          flexDirection='column'
          justifyContent='flex-start'
        >
          {contacts.map((contact) => (
            <CardMobile
              id={contact.id}
              name={contact.name}
              phone={contact.phone}
              email={contact.email}
              date={contact.createdAt}
              key={contact.id}
            />
          ))}
        </Flex>
      ) : (
        <Grid
          h='65vh'
          overflowY='scroll'
          templateColumns='repeat(4, 1fr)'
          gap='4'
        >
          {contacts.map((contact) => (
            <GridItem key={contact.id}>
              <CustomCard
                id={contact.id}
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                date={contact.createdAt}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  )
}
