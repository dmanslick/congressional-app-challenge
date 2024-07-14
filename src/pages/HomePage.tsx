import { Center } from '@chakra-ui/react'
import { useUser } from '../firebase/useUser'

export default function HomePage() {
    const { user } = useUser()

    return (
        <Center h='100vh'>
            <p>Hello, {user?.displayName}!</p>
        </Center>
    )
}
