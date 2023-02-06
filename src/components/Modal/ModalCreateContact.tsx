import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Input } from "../../components/Form/Input"
import { UseGetScreenWidth } from "../../hook"
import { useContact } from "../../contexts/ContactContext"

interface IContactData {
  name: string
  phone: string
  email: string
}

const createContactSchema = yup.object().shape({
  name: yup.string().required("name required"),
  phone: yup.string().required("phone required"),
  email: yup.string().required("email required").email("invalid email"),
})

const ModalCreateContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createContact, loadContacts } = useContact()

  const [, width] = UseGetScreenWidth()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createContactSchema),
  })

  const handleCreate = (data: IContactData) => {
    createContact(data)
    onClose()
    loadContacts()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        fontFamily='Nunito'
        fontWeight='bold'
        p={width >= 768 ? "6" : "none"}
        children={width >= 768 ? "+ New Contact" : "+ New"}
        h='100%'
        bgColor='green.600'
        _hover={{ bgColor: "green.800", color: "white" }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent
          as='form'
          onSubmit={handleSubmit(handleCreate as SubmitHandler<FieldValues>)}
          borderRadius='12px'
          bgColor='gray.200'
          p='10px 5px 15px 5px'
          m={["4", "4", "6", "6"]}
          alignSelf='center'
        >
          <ModalHeader
            fontSize='2xl'
            color='blue.600'
            fontWeight={600}
            fontFamily='Poppins'
          >
            Add new Contact
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection='column' gap='10px'>
            <Input
              label='Name'
              placeholder='Louis Smith'
              error={errors.name}
              {...register("name")}
            />

            <Input
              label='Phone'
              placeholder='5511998989898'
              error={errors.phone}
              {...register("phone")}
            />

            <Input
              label='Email'
              placeholder='louis@mail.com'
              type='email'
              error={errors.email}
              {...register("email")}
            />
          </ModalBody>
          <ModalFooter display='flex' flexDirection='column' gap='10px'>
            <Button
              bgColor='blue.600'
              type='submit'
              w='100%'
              _hover={{ background: "blue.700" }}
              color='white'
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='semibold'
            >
              Add
            </Button>
            <Button
              onClick={onClose}
              w='100%'
              _hover={{ background: "gray.300" }}
              fontFamily='Poppins'
              fontSize='md'
              fontWeight='semibold'
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCreateContact
