import { useEffect } from "react"
import { Flex, VStack } from "@chakra-ui/react"

import { UseGetScreenWidth } from "../../hook"
import { FilterMobile } from "./FilterMobile"
import { HeaderMobile } from "./HeaderMobile"
import { useContact } from "../../contexts/ContactContext"
import { Filter } from "./Filter"
import { Aside } from "./Aside"
import { List } from "./List"

const Dashboard = () => {
  const { contacts, loadContacts } = useContact()
  const [, width] = UseGetScreenWidth()

  useEffect(() => {
    loadContacts()
  }, [])

  return (
    <Flex
      w='100vw'
      h='100vh'
      flexDirection={["column", "column", "row", "row"]}
      justifyContent={[
        "flex-start",
        "flex-start",
        "space-between",
        "space-between",
      ]}
    >
      {width >= 768 ? <Aside /> : <HeaderMobile />}

      <VStack
        paddingTop={["0", "0", "4", "4"]}
        paddingBottom={["0", "0", "4", "4"]}
        paddingLeft={["6", "6", "12", "12"]}
        paddingRight={["6", "6", "12", "12"]}
        w={["100%", "100%", "80%", "80%"]}
        h={["82%", "82%", "100%", "100%"]}
      >
        {width >= 768 ? <Filter /> : <FilterMobile />}
        <List contacts={contacts} />
      </VStack>
    </Flex>
  )
}

export default Dashboard
