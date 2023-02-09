import { useForm } from "react-hook-form"
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button, Flex, VStack } from "@chakra-ui/react"
import { FaEnvelope, FaLock } from "react-icons/fa"

import { Input } from "../../components/Form/Input"
import { signInSchema } from "../../validators"

interface SignInData {
    email: string
    password: string
  }

interface LoginFormProps {
    handleSignIn: (data: SignInData) => void
}

export const LoginForm = ({ handleSignIn }: LoginFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  return (
    <Flex
      onSubmit={handleSubmit(handleSignIn as SubmitHandler<FieldValues>)}
      as='form'
      w='100%'
      h='50%'
      justifyContent='space-between'
      flexDirection='column'
    >
      <VStack w='100%' height='60%' justifyContent='space-between'>
        <Input
          placeholder='Write your email'
          icon={FaEnvelope}
          label='Email'
          type='email'
          error={errors.email}
          {...register("email")}
        />
        <Input
          placeholder='Write your password'
          icon={FaLock}
          label='Password'
          type='password'
          error={errors.password}
          {...register("password")}
        />
      </VStack>

      <Button
        w='100%'
        h='50px'
        bg='orange.400'
        color='white'
        fontSize='lg'
        fontWeight={500}
        fontFamily='Poppins'
        _hover={{ background: "orange.500" }}
        type='submit'
      >
        Login
      </Button>
    </Flex>
  )
}
