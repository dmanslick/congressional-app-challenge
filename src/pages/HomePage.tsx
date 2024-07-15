import { AbsoluteCenter, Text } from '@chakra-ui/react'
import { useUser } from '../firebase/useUser'

export default function HomePage() {
    const { user } = useUser()

    return (
        <AbsoluteCenter>
            <Text fontSize='3xl' fontWeight='medium'>Hello {user?.displayName}!</Text>
        </AbsoluteCenter>
    )
}
