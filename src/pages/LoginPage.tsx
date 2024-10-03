import { FormEvent, useState } from 'react'
import { Box, Button, Input, Link, Stack, Text, useToast } from '@chakra-ui/react'
import { login } from '../firebase/auth'
import { Link as RouterLink } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (e) {
            toast({
                title: `${e}`,
                colorScheme: 'red',
                isClosable: true
            })
            console.log('did not work')
        }
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center' h='100vh' width='calc(100% - 32px)' marginInline='auto'>
            <Box>
                <Stack gap='1rem' w='100%' as='form' onSubmit={handleLogin}>
                    <Text fontSize='x-large' fontWeight={500} textAlign='center'>Please Login</Text>
                    <Input placeholder='Email' type='email' onChange={e => setEmail(e.target.value)} />
                    <Input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
                    <Button colorScheme='purple' textAlign='center' type='submit'>Login</Button>
                    <Link as={RouterLink} to='/register' fontSize='small' color='purple.500' w='fit-content'>Sign Up</Link>
                </Stack>
            </Box>
        </Box>
    )
}
