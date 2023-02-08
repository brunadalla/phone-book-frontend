import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react"
import { BsCalendar, BsEnvelope, BsTelephone } from "react-icons/bs"
import { HiOutlineTrash } from "react-icons/hi"
import { useContact } from "../../contexts/ContactContext"
import ModalUpdateContact from "../Modal/ModalUpdateContact"

interface IContactProps {
  id: string
  name: string
  phone: string
  email: string
  date: Date
}
export const CardMobile = ({ id, name, phone, email, date }: IContactProps) => {
  const formatedDate = new Date(date)
  const { deleteContact } = useContact()

  return (
    <Accordion allowToggle>
      <AccordionItem bgColor='green.500' borderRadius='8px' border='none'>
        <>
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
                <ModalUpdateContact
                  id={id}
                  name={name}
                  phone={phone}
                  email={email}
                />
                <Box
                  p='0'
                  bgColor='transparent'
                  _hover={{ color: "green.800" }}
                  onClick={() => deleteContact(id)}
                >
                  <HiOutlineTrash size='20' />
                </Box>
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
        </>
      </AccordionItem>
    </Accordion>
  )
}
