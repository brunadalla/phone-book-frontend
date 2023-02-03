import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react"
import { BsTelephone, BsEnvelope, BsCalendar } from "react-icons/bs"
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"

interface IContactProps {
  name: string
  phone: string
  email: string
  date: Date
}

export const CustomCard = ({ name, phone, email, date }: IContactProps) => {
  const formatedDate = new Date(date)

  return (
    <Card overflowWrap='break-word' bgColor='green.500'>
      <CardHeader
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading fontFamily='Poppins' fontWeight='semibold' fontSize='lg'>
          {name}
        </Heading>

        <HStack>
          <Button
            p='0'
            size='20'
            bgColor='transparent'
            _hover={{ color: "green.800" }}
          >
            <HiOutlinePencilAlt size='20' />
          </Button>
          <Button
            p='0'
            size='20'
            bgColor='transparent'
            _hover={{ color: "green.800" }}
          >
            <HiOutlineTrash size='20' />
          </Button>
        </HStack>
      </CardHeader>

      <CardBody fontWeight='semibold' fontFamily='Nunito' pt='4'>
        <VStack alignItems='flex-start' gap='2'>
          <HStack>
            <BsTelephone />
            <Text>{phone}</Text>
          </HStack>

          <HStack>
            <BsEnvelope />
            <Text>{email}</Text>
          </HStack>

          <HStack>
            <BsCalendar />
            <Text>{formatedDate.toDateString()}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}
