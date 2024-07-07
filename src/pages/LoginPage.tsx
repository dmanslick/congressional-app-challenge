import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()

    return (
        <Box display='flex' alignItems='center' justifyContent='center' h='100vh' width='calc(100% - 32px)' marginInline='auto'>
            <Box>
                <Stack gap='1rem' w='100%'>
                    <Text fontSize='x-large' fontWeight={500} textAlign='center'>Please Login</Text>
                    <Input placeholder='Email' type='email' />
                    <Input placeholder='Password' type='password' />
                    <Button colorScheme='blue' textAlign='center' onClick={() => navigate('/app')}>Login</Button>
                </Stack>
            </Box>
        </Box>
    )
}
