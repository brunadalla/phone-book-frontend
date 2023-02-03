import { Button, FormControl, Heading, HStack } from "@chakra-ui/react"
import { Input } from "../../components/Form/Input"

export const Header = () => {
    return (
        <HStack>
            <Heading> Contacts </Heading>
        <FormControl>
            <Input name="search" placeholder="Search contact"/>
            <Button> Search </Button>
        </FormControl>
        </HStack>

    )
}