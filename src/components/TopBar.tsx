import { useRef } from 'react'
import { Box, Menu, MenuButton, IconButton, MenuList, MenuItem, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Portal } from '@chakra-ui/react'
import { MenuIcon } from 'lucide-react'
import { logout } from '../firebase/auth'

export default function TopBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    const handleLogout = () => {
        onClose()
        logout()
    }

    return (
        <>
            <Box h='56px' bg='white' display='flex' flexDir='row' alignItems='center' position='fixed' top={0} w='100%' px={2}>
                <Menu autoSelect={false}>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<MenuIcon />}
                        variant='none'
                    />
                    <Portal>
                        <MenuList>
                            <MenuItem>View Profile</MenuItem>
                            <MenuItem>Help Us Improve</MenuItem>
                            <MenuItem onClick={onOpen}>Logout</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
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
        </>
    )
}
