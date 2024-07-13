import { Button, Center } from '@chakra-ui/react'
import { logout } from '../firebase/auth'

export default function HomePage() {
    return (
        <Center h='100vh'>
            <Button colorScheme='red' onClick={logout}>Logout</Button>
        </Center>
    )
}
