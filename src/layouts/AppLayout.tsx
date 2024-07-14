import React, { useRef } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { Bot, Camera, CircleHelp, Home, MenuIcon, Users } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../firebase/useUser'
import { logout } from '../firebase/auth'

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
        component: <Users />
    }
]

const inactiveColor = '#bababa'

export default function AppLayout() {
    const { user } = useUser()
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    if (user == null) navigate('/', { replace: true })

    const handleLogout = () => {
        onClose()
        logout()
    }

    return (
        <Box h='100vh' bg='#EEEEEE'>
            <Box h='56px' bg='white' display='flex' flexDir='row' alignItems='center' position='fixed' top={0} w='100%' px={2}>
                <Menu autoSelect={false}>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<MenuIcon />}
                        variant='none'
                    />
                    <MenuList>
                        <MenuItem>View Profile</MenuItem>
                        <MenuItem>Help Us Improve</MenuItem>
                        <MenuItem onClick={onOpen}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <Outlet />
            <Box h='56px' bg='white' display='flex' flexDir='row' justifyContent='space-around' alignItems='center' position='fixed' bottom={0} w='100%'>
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
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent mx={3}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>Logout</AlertDialogHeader>
                        <AlertDialogBody>Are you sure? You will need to login again if you want to use this app.</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleLogout} ml={3}>
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box >
    )
}
