import {
  Button,
  createStandaloneToast,
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

import { useNavigate } from "react-router-dom"

import { Input } from "../../components/Form/Input"

import * as yup from "yup"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "../../services/api"

const signInSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  phone: yup.string().required("phone required"),
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup.string().required("Password required"),
})

const { toast } = createStandaloneToast()

interface ISignupData {
  name: string
  phone: string
  email: string
  password: string
}

const ModalRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const handleSignup = ({ name, phone, email, password }: ISignupData) => {
    api
      .post("/users", { name, phone, email, password })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)

      })
  }

  return (
    <>
      <Text
        onClick={onOpen}
        fontSize='lg'
        fontFamily='Nunito'
        w='100%'
        textAlign='center'
        fontWeight={700}
        _hover={{ cursor: "pointer", color: "blue.600" }}
      >
        Register now!
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(2px)' />
        <ModalContent
          as='form'
          onSubmit={
              handleSubmit(handleSignup as SubmitHandler<FieldValues>)
            
          }
          borderRadius='12px'
          bgColor='gray.200'
          p='10px 5px 15px 5px'
        >
          <ModalHeader
            fontSize='2xl'
            color='blue.600'
            fontWeight={600}
            fontFamily='Poppins'
          >
            Create your Account
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
              error={errors.email}
              {...register("email")}
            />

            <Input
              label='Password'
              placeholder='******'
              error={errors.password}
              {...register("password")}
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
              Create
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

export default ModalRegister
