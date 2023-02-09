import {
  createStandaloneToast,
  Flex,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react"

import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import Background from "../../assets/background.png"
import ModalRegister from "../../components/Modal/ModalRegister"

import { Header } from "../../components/Header"
import { useAuth } from "../../contexts/AuthContext"
import { LoginForm } from "./LoginForm"
import { ISignInData } from "../../interfaces/UserInterfaces"
import { ToastLoadingError } from "../../components/Toast"
import { UseGetScreenWidth } from "../../hook"

const { toast } = createStandaloneToast()

export const Login = () => {
  const navigate = useNavigate()
  const { signIn, setIsLoading } = useAuth()

  const [, width] = UseGetScreenWidth()

  const handleSignIn = (data: ISignInData) => {
    setIsLoading(true)
    toast({
      position: width >= 768 ? "top-right" : "top",
      duration: 120000,
      isClosable: false,
      render: ToastLoadingError,
    })
    signIn(data)
      .then(() => {
        toast.closeAll()
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        setIsLoading(false)
        setTimeout(() => {
          toast.closeAll()
        }, 3000)
      })
  }

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

        <LoginForm handleSignIn={handleSignIn} />
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
      <Toaster />
    </Flex>
  )
}
