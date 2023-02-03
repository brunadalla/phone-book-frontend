import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react"

interface IContactProps {
  id: string
  name: string
  phone: string
  email: string
  date: string
}

export const CustomCard = (contact: IContactProps) => {
  const { name, phone, email, date } = contact

  return (
    <Card>
      <CardHeader>
        <Heading>{name}</Heading>

        <HStack>
          <Button></Button>
          <Button></Button>
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack>
          <HStack>
            <Text>{phone}</Text>
          </HStack>

          <HStack>
            <Text>{email}</Text>
          </HStack>

          <HStack>
            <Text>{date}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}
