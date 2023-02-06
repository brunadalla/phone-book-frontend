import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  HStack,
  Text,
} from "@chakra-ui/react"

import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react"

import { IconType } from "react-icons"
import { CgDanger } from "react-icons/cg"

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: any
  icon?: IconType
}

type InputVariationOptions = {
  [key: string]: string
}

const inputVariation: InputVariationOptions = {
  error: "red.600",
  default: "gray.200",
  focus: "blue.600",
  filled: "gray.900",
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, icon: Icon, label, ...rest },
  ref
) => {
  const [value, setValue] = useState("")
  const [variation, setVariation] = useState("default")

  useEffect(() => {
    if (error) {
      return setVariation("error")
    }
  }, [error])

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus")
    }
  }, [error])

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled")
    }
  }, [error, value])

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <HStack justifyContent='space-between'>
          <FormLabel
            color='gray.900'
            fontSize='lg'
            fontWeight={500}
            fontFamily='Poppins'
            mb='0'
          >
            {label}
          </FormLabel>
          {error && (
            <Text
              fontFamily='Nunito'
              color='red.600'
              fontSize='sm'
              fontWeight='semibold'
            >
              {error.message}
            </Text>
          )}
        </HStack>
      )}
      <InputGroup mt='5px'>
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt='1'>
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          id={name}
          name={name}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          onBlurCapture={handleInputBlur}
          onFocus={handleInputFocus}
          borderColor={inputVariation[variation]}
          color={inputVariation[variation]}
          bg='gray.50'
          variant='outline'
          _hover={{ bgColor: "gray.100" }}
          _placeholder={{ color: "gray.300" }}
          _focus={{ bg: "gray.100" }}
          borderRadius='8px'
          size='lg'
          h='50px'
          w='100%'
          ref={ref}
          {...rest}
        />
        {error && (
          <InputRightElement pointerEvents='none' h='50px'>
            <CgDanger color='red' size='20' />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
