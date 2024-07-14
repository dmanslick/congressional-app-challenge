import { Stack, Input, Button, Box, Text, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useUser } from '../firebase/useUser'
import { register } from '../firebase/auth'

export default function SignUpPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { user } = useUser()

    if (user != null) navigate('/app', { replace: true })

    const handleRegister = () => {
        try {
            register(email, password, username)
        } catch (e) {
            console.log('did not work')
        }
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center' h='100vh' width='calc(100% - 32px)' marginInline='auto'>
            <Box>
                <Stack gap='1rem' w='100%'>
                    <Text fontSize='x-large' fontWeight={500} textAlign='center'>Please Register</Text>
                    <Input placeholder='Name' type='text' onChange={e => setUsername(e.target.value)} />
                    <Input placeholder='Email' type='email' onChange={e => setEmail(e.target.value)} />
                    <Input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
                    <Button colorScheme='blue' textAlign='center' onClick={handleRegister}>Register</Button>
                    <Link as={RouterLink} to='/' fontSize='small' color='#3182ce' w='fit-content'>Login</Link>
                </Stack>
            </Box>
        </Box>
    )
}
