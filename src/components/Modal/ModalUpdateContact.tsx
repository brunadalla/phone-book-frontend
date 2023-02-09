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

import { Input } from "../../components/Form/Input"
import { useContact } from "../../contexts/ContactContext"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { updateContactSchema } from "../../validators"

interface IContactData {
  name?: string
  phone?: string
  email?: string
}

interface IUpdateContactProps {
  id: string
  name: string
  phone: string
  email: string
}


const ModalUpdateContact = ({
  id,
  name,
  phone,
  email,
}: IUpdateContactProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { updateContact, loadContacts } = useContact()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(updateContactSchema),
  })

  const handleUpdate = (data: IContactData) => {
    updateContact(id, data)
    onClose()
    loadContacts()
  }

  return (
    <>
      <Button
        p='0'
        bgColor='transparent'
        _hover={{ color: "green.800" }}
        onClick={onOpen}
        size='20'
      >
        <HiOutlinePencilAlt size='20' />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent
          as='form'
          onSubmit={handleSubmit(handleUpdate as SubmitHandler<FieldValues>)}
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
            Update Contact
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex' flexDirection='column' gap='10px'>
            <Input
              label='Name'
              defaultValue={name}
              error={errors.name}
              {...register("name")}
            />

            <Input
              label='Phone'
              defaultValue={phone}
              error={errors.phone}
              {...register("phone")}
            />

            <Input
              label='Email'
              defaultValue={email}
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
              Update
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

export default ModalUpdateContact
