import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from "../../components/Form/Input"
import { useContact } from "../../contexts/ContactContext"
import { UseGetScreenWidth } from "../../hook"
import { createContactSchema } from "../../validators"
import { IContactCreateProps } from "../../interfaces/ContactInterfaces"

const ModalCreateContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createContact, loadContacts, contacts } = useContact()

  const [error, setError] = useState("")

  const [, width] = UseGetScreenWidth()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createContactSchema),
  })

  const handleCreate = (data: IContactCreateProps) => {
    const emailAlreadyExists = contacts.find(
      (contact) => contact.email === data.email
    )
    const phoneAlreadyExists = contacts.find(
      (contact) => contact.phone === data.phone
    )

    if (emailAlreadyExists) {
      setError(`${emailAlreadyExists.name} already has this email`)
    } else if (phoneAlreadyExists) {
      setError(`${phoneAlreadyExists.name} already has this phone`)
    } else {
      createContact(data)
      onClose()
      loadContacts()
    }
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

            {error && (
              <Text
                fontFamily='Nunito'
                color='red.600'
                fontSize='sm'
                fontWeight='semibold'
                pt='2'
              >
                {error}
              </Text>
            )}
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
