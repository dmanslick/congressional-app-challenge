import { AbsoluteCenter, Spinner, Box } from '@chakra-ui/react'
import { useUser } from '../firebase/useUser'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UnauthLayout() {
    const { user } = useUser()
    const navigate = useNavigate()

    if (user !== null) navigate('/app', { replace: true })

    if (user === undefined) {
        return (
            <Box minH='100vh'>
                <AbsoluteCenter>
                    <Spinner color='blue.500' />
                </AbsoluteCenter>
            </Box>
        )
    }

    return (
        <Outlet />
    )
}