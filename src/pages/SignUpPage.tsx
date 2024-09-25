import { Stack, Input, Button, Box, Link, RadioGroup, FormLabel, FormControl, Radio, TabList, Tab, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { register } from '../firebase/auth'

export default function SignUpPage() {
    const [data, setData] = useState({
        'Name': '',
        'Email': '',
        'Password': '',
        'Child Name': '',
        'Child Age': '',
        'Diagnosis Date': '',
        'Sensory Sensitivities': '',
        'Current Therapies': '',
        'Preferred Calming Techniques': '',
        'Primary Method of Communication': ''
    })

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        try {
            register(data)
        } catch (e) {
            console.log('did not work')
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prev => {
            return { ...prev, ...{ [e.target.placeholder]: e.target.value } }
        })
    }

    const handleRadio = (value: string) => {
        setData(prev => {
            return { ...prev, ...{ 'Primary Method of Communication': value } }
        })
    }

    return (
        <Box display='flex' alignItems='center' justifyContent='center' minH='100vh' width='calc(100% - 32px)' marginInline='auto'>
            <Tabs>
                <TabList w='fit-content' mx='auto' my={4}>
                    <Tab>Account Info</Tab>
                    <Tab>Child Info</Tab>
                </TabList>

                <TabPanels as='form' onSubmit={handleRegister}>
                    <TabPanel>
                        <Box>
                            <Stack gap='1rem' w='100%'>
                                <Input placeholder='Name' type='text' onChange={handleInput} />
                                <Input placeholder='Email' type='email' onChange={handleInput} />
                                <Input placeholder='Password' type='password' onChange={handleInput} />
                                <Link as={RouterLink} to='/' fontSize='small' color='#3182ce' w='fit-content'>Login</Link>
                            </Stack>
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <Stack gap='1rem' w='100%'>
                            <Input placeholder='Child Name' type='text' onChange={handleInput} />
                            <Input placeholder='Child Age' type='text' onChange={handleInput} />
                            <Input placeholder='Diagnosis Date' type='date' onChange={handleInput} />
                            <Input placeholder='Sensory Sensitivities' type='text' onChange={handleInput} />
                            <Input placeholder='Current Therapies' type='text' onChange={handleInput} />
                            <Input placeholder='Preferred Calming Techniques' type='text' onChange={handleInput} />
                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>Primary Method of Communication</FormLabel>
                                <RadioGroup onChange={handleRadio}>
                                    <Stack spacing='24px'>
                                        <Radio value='Verbal'>Verbal</Radio>
                                        <Radio value='Non-verbal'>Non-verbal</Radio>
                                        <Radio value='Combination of both'>Combination of both</Radio>
                                        <Radio value='AAC Device'>AAC Device</Radio>
                                        <Radio value='Key Behavioral Traits'>Key Behavioral Traits</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <Button colorScheme='blue' textAlign='center' type='submit' my={3}>Register</Button>
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
