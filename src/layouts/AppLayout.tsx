import React from 'react'
import { Box, Circle } from '@chakra-ui/react'
import { Bot, Camera, CircleHelp, Home, Menu, MessageSquare } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../firebase/useUser'

interface NavLink {
    to: string,
    ariaLabel: string,
    component: React.ReactNode
}

const navLinks: NavLink[] = [
    {
        to: '/app/help',
        ariaLabel: 'Help link',
        component: <CircleHelp />,
    },
    {
        to: '/app/camera',
        ariaLabel: 'Camera link',
        component: <Camera />
    },
    {
        to: '/app',
        ariaLabel: 'Home link',
        component: <Home />
    },
    {
        to: '/app/chatbot',
        ariaLabel: 'AI Chat link',
        component: <Bot />
    },
    {
        to: '/app/community',
        ariaLabel: 'Community link',
        component: <MessageSquare />
    }
]

const inactiveColor = '#bababa'

export default function AppLayout() {
    const { user } = useUser()
    const location = useLocation()
    const navigate = useNavigate()

    if (user == null) navigate('/', { replace: true })

    return (
        <Box h='100vh' bg='#EEEEEE'>
            <Box h='56px' bg='white' display='flex' flexDir='row' justifyContent='space-between' alignItems='center' position='fixed' top={0} w='100%' maxW={448} px={4}>
                <Circle color={inactiveColor}>
                    <Menu />
                </Circle>
            </Box>
            <Outlet />
            <Box h='56px' bg='white' display='flex' flexDir='row' justifyContent='space-around' alignItems='center' position='fixed' bottom={0} w='100%' maxW={448}>
                {navLinks.map(({ to, component, ariaLabel }) => {
                    return (
                        <Link to={to} aria-label={ariaLabel}>
                            <Box color={String(location.pathname != to && inactiveColor)}>
                                {component}
                            </Box>
                        </Link>
                    )
                })}
            </Box>
        </Box>
    )
}
