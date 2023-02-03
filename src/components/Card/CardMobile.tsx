import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  HStack,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react"
import { BsCalendar, BsEnvelope, BsTelephone } from "react-icons/bs"
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"

interface IContactProps {
  name: string
  phone: string
  email: string
  date: Date
}
export const CardMobile = ({ name, phone, email, date }: IContactProps) => {
  const formatedDate = new Date(date)

  return (
    <Accordion allowToggle>
      <AccordionItem bgColor='green.500' borderRadius='8px' border='none'>
        <h2>
          <AccordionButton
            _focus={{ borderRadius: "8px" }}
            _hover={{ borderRadius: "8px" }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontFamily='Poppins'
              fontWeight='semibold'
              fontSize='md'
            >
              {name}
            </Box>

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
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
