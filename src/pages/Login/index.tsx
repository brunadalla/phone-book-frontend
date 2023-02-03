import {
  createStandaloneToast,
  Flex,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types"

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { useState } from "react"

import { useAuth } from "../../contexts/AuthContext"
import { LoginForm } from "./LoginForm"
import { Header } from "../../components/Header"
import Background from "../../assets/background.png"
import { UseGetScreenWidth } from "../../hook"
import ModalRegister from "../../components/Modal/ModalRegister"
import { useNavigate } from "react-router-dom"

const { toast } = createStandaloneToast()

const signInSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup.string().required("Password required"),
})

interface SignInData {
  email: string
  password: string
}

export const Login = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { signIn } = useAuth()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const handleSignIn = (data: SignInData) => {
    signIn(data)
    .then(() => navigate('/dashboard'))
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
  }

  const [, width] = UseGetScreenWidth()

  return (
    <Flex
      w='100vw'
      h='100vh'
      alignItems={["flex-start", "flex-start", "center", "center"]}
      justifyContent={["center", "center", "flex-start", "flex-start"]}
      bgGradient={[
        "linear(to-b, #76C893, #52B69A, #34a0a4)",
        "linear(to-b, #76C893, #52B69A, #34a0a4)",
        "linear(to-b, #6FD7A5, #61D4A4, #59CDA3)",
        "linear(to-b, #6FD7A5, #61D4A4, #59CDA3)",
      ]}
    >
      {width >= 768 && (
        <Img
          src={Background}
          w='100vw'
          h='100vh'
          maxW='1440px'
          position='absolute'
          objectFit='cover'
          bottom={0}
          right={0}
        />
      )}
      <VStack
        p={["5%", "5%", "5% 0 5% 8%", "5% 0 5% 8%"]}
        h='100%'
        w={["100%", "100%", "36%", "36%"]}
        minW={["300px", "300px", "490px", "490px"]}
        justifyContent='space-between'
        zIndex='100'
      >
        <Header />

        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(
            handleSignIn as SubmitHandler<FieldValues>
          )}
          register={register}
        />
        <Flex
          flexDirection='column'
          fontSize='lg'
          fontFamily='Nunito'
          w='100%'
          textAlign='center'
        >
          <Text> Don`t have an account yet? </Text>
          <ModalRegister />
        </Flex>
      </VStack>

      {error &&
        toast({
          title: "Ooops...",
          description: "Incorrect email or password. Try again!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })}
    </Flex>
  )
}
