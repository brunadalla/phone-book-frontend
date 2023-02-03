import { Flex, VStack } from "@chakra-ui/react"
import { Aside } from "./Aside"
import { Header } from "./Header"
import { List } from "./List"

const Dashboard = () => {
  return (
    <Flex>
      <Aside />
      <VStack>
        <Header />
        <List />
      </VStack>
    </Flex>
  )
}

export default Dashboard
