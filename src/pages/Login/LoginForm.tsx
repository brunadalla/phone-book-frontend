import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import { Button, Flex, Text, VStack } from "@chakra-ui/react"
import { FaEnvelope, FaLock } from "react-icons/fa"

import { Input } from "../../components/Form/Input"

interface LoginFormProps {
  handleSignIn: () => void
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
  loading: boolean
}

export const LoginForm = ({
  handleSignIn,
  register,
  errors,
  loading,
}: LoginFormProps) => {
  return (
    <Flex
      onSubmit={handleSignIn}
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
        {errors.email && <Text 
          fontSize='md'
          fontFamily='Nunito'
          w='100%'
          color='red.600'
          textAlign='left'> {errors.mail} 
          </Text>}

        <Input
          placeholder='Write your password'
          icon={FaLock}
          label='Password'
          type='password'
          error={errors.password}
          {...register("password")}
        />
        {errors.password && <Text 
          fontSize='md'
          fontFamily='Nunito'
          w='100%'
          color='red.600'> {errors.password} 
          </Text>}
      </VStack>

      <Button
        isLoading={loading}
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
