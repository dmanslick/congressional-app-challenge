import { FormEvent, useState } from 'react';
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { login } from '../firebase/auth';
import { Link as RouterLink } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    try {
      login(email, password);
    } catch (e) {
      console.log('did not work');
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      h='100vh'
      width='calc(100% - 32px)'
      marginInline='auto'
      backgroundColor='#F2F5FA'
    >
      <Box>
        <Text fontSize='2xl' fontWeight='bold' textAlign='center' mb={4} sx={{
          background: 'linear-gradient(to right, #002868, #66B2FF)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          '-webkit-text-fill-color': 'transparent'
        }}>
          Welcome to Kora
        </Text>
        <Stack gap='1rem' w='100%' as='form' onSubmit={handleLogin}>
          <Text fontSize='x-large' fontWeight={500} textAlign='center'>
            Please Login
          </Text>
          <Input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
          <Button colorScheme='blue' textAlign='center' type='submit'>
            Login
          </Button>
          <Link as={RouterLink} to='/register' fontSize='small' color='#3182ce' w='fit-content'>
            Sign Up
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}