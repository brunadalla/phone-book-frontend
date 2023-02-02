import { IconType } from "react-icons"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react"

import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react"

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
        <FormLabel
          color='gray.900'
          fontSize='lg'
          fontWeight={500}
          fontFamily='Poppins'
        >
          {label}
        </FormLabel>
      )}
      <InputGroup flexDirection='column'>
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
        {!!error && <FormErrorMessage mt='2'>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
