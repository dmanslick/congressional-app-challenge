import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../firebase/useUser'
import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'


export default function AppLayout() {
    const { user } = useUser()
    const navigate = useNavigate()

    if (user === null) navigate('/', { replace: true })

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
        <Box minH='100vh' bg='#EEEEEE'>
            <TopBar />
            <Outlet />
            <BottomBar />
        </Box >
    )
}