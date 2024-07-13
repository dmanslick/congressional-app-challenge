import { useState } from 'react'
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { login } from '../firebase/auth'
import { Link as RouterLink } from 'react-router-dom'
import { useUser } from '../firebase/useUser'

export default function LoginPage() {
    const { user } = useUser()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    if (user != null) navigate('/app', { replace: true })

    const handleLogin = () => {
        try {
            login(email, password)
            navigate('/app')
        } catch (e) {
            console.log('did not work')
        }
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center' h='100vh' width='calc(100% - 32px)' marginInline='auto'>
            <Box>
                <Stack gap='1rem' w='100%'>
                    <Text fontSize='x-large' fontWeight={500} textAlign='center'>Please Login</Text>
                    <Input placeholder='Email' type='email' onChange={e => setEmail(e.target.value)} />
                    <Input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
                    <Button colorScheme='blue' textAlign='center' onClick={handleLogin}>Login</Button>
                    <Link as={RouterLink} to='/register' fontSize='small' color='#3182ce'>Sign Up</Link>
                </Stack>
            </Box>
        </Box>
    )
}
