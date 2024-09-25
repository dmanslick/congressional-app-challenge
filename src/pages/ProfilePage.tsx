import { Button, Center, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Spinner, Heading, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getProfile } from '../utils/getProfile'
import { useUser } from '../firebase/useUser'
import { editProfile } from '../utils/editProfile'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
    const { user } = useUser()
    const [data, setData] = useState<Profile | null>(null)
    const navigate = useNavigate()
    const toast = useToast()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev: any) => {
            return { ...prev, ...{ [e.target.placeholder]: e.target.value } }
        })
    }

    const handleRadio = (value: string) => {
        setData((prev: any) => {
            return { ...prev, ...{ 'Primary Method of Communication': value } }
        })
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (data) {
            await editProfile({ data, userId: user?.uid! })
            toast({
                title: 'Profile Successfully Updated',
                colorScheme: 'green',
                isClosable: true
            })
            navigate('/')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile({ userId: user?.uid! })
            setData(profile)
        }

        fetchData()
    }, [user])

    return (
        <>
            {data == null && <Spinner />}
            {data && (
                <Center>
                    <Stack gap='1rem' w='calc(100vw - 48px)' bg='white' p='1rem' my='5rem' mx='auto' rounded='md' as='form' onSubmit={handleUpdate}>
                        <Heading textAlign='center'>My Profile</Heading>
                        <FormControl>
                            <FormLabel>Child Name:</FormLabel>
                            <Input placeholder='Child Name' type='text' onChange={handleInput} value={data?.['Child Name']} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Child Age:</FormLabel>
                            <Input placeholder='Child Age' type='text' onChange={handleInput} defaultValue={data?.['Child Age']} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Diagnosis Date:</FormLabel>
                            <Input placeholder='Diagnosis Date' type='date' onChange={handleInput} defaultValue={data?.['Diagnosis Date']} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Sensory Sensitivities</FormLabel>
                            <Input placeholder='Sensory Sensitivities' type='text' onChange={handleInput} defaultValue={data?.['Sensory Sensitivities']} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Current Therapies</FormLabel>
                            <Input placeholder='Current Therapies' type='text' onChange={handleInput} defaultValue={data?.['Current Therapies']} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Preferred Calming Techniques:</FormLabel>
                            <Input placeholder='Preferred Calming Techniques' type='text' onChange={handleInput} defaultValue={data?.['Preferred Calming Techniques']} />
                        </FormControl>
                        <FormControl as='fieldset'>
                            <FormLabel as='legend'>Primary Method of Communication</FormLabel>
                            <RadioGroup onChange={handleRadio} defaultValue={'Key Behavioral Traits'}>
                                <Stack spacing='24px'>
                                    <Radio value='Verbal'>Verbal</Radio>
                                    <Radio value='Non-verbal'>Non-verbal</Radio>
                                    <Radio value='Combination of both'>Combination of both</Radio>
                                    <Radio value='AAC Device'>AAC Device</Radio>
                                    <Radio value='Key Behavioral Traits'>Key Behavioral Traits</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <Button colorScheme='blue' textAlign='center' type='submit' my={3}>Save Changes</Button>
                    </Stack>
                </Center>
            )}
        </>
    )
}