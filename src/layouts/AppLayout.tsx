import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Bot, Camera, CircleHelp, Home, MessageSquare } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

interface NavLink {
    to: string,
    component: React.ReactNode
}

const navLinks: NavLink[] = [
    {
        to: '/app/help',
        component: <CircleHelp />
    },
    {
        to: '/app/camera',
        component: <Camera />
    },
    {
        to: '/app',
        component: <Home />
    },
    {
        to: '/app/chatbot',
        component: <Bot />
    },
    {
        to: '/app/community',
        component: <MessageSquare />
    }
]

export default function AppLayout() {
    const location = useLocation()

    return (
        <Box display='flex' flexDir='column' justifyContent='space-between' h='100vh'>
            <Outlet />
            <Box h='56px' bg='white' borderTopRadius='16px' display='flex' flexDir='row' justifyContent='space-around' alignItems='center'>
                {navLinks.map(({ to, component }) => {
                    return (
                        <Link to={to}>
                            <Box color={String(location.pathname == to && 'red')}>
                                {component}
                            </Box>
                        </Link>
                    )
                })}
            </Box>
        </Box>
    )
}
