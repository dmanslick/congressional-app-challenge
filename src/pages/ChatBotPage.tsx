import { GoogleGenerativeAI } from '@google/generative-ai'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { getChatHistory } from '../utils/getChatHistory'
import { useUser } from '../firebase/useUser'
import { AbsoluteCenter, Box, Button, Flex, Input, Textarea } from '@chakra-ui/react'
import BotMessage from '../components/BotMessage'
import UserMessage from '../components/UserMessage'
import { SendIcon } from 'lucide-react'

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// }

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const geminiModel = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })

export default function ChatBotPage() {
    const { user } = useUser()
    const [message, setMessage] = useState('')
    const [loadingResponse, setLoadingResponse] = useState(false)
    const { data: history } = useQuery({
        queryKey: ['chatHistory'],
        queryFn: () => getChatHistory(user?.uid as string)
    })

    const { mutate } = useMutation({
        mutationFn: async () => { },
        onSuccess: (_, variables) => {

        },
    })

    const chat = useMemo(() => geminiModel.startChat(), [])

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault()
        setLoadingResponse(true)
        const result = await chat.sendMessage(message)
        setLoadingResponse(false)
    }

    // useEffect(() => {
    //     console.log(user?.uid)

    //     return () => {
    //         console.log('cleanup')
    //     }
    // }, [])

    return (
        <AbsoluteCenter>
            <Box>
                <Box display='flex' flexDir='column-reverse' h='calc(100vh - 112px)' maxW='400px' w='calc(100vw - 1rem)'>
                    {history && history.map(message => {
                        if (message.role == 'model') {
                            return <BotMessage text={message.parts[0].text} />
                        }
                        return <UserMessage text={message.parts[0].text} />
                    })}
                </Box>
                <Flex dir='row' gap={2} mb={20} mt={2} as='form' onSubmit={sendMessage}>
                    <Textarea rows={1} placeholder='Message' bg='white' onChange={e => setMessage(e.target.value)} />
                    <Button type='submit' aria-label='Search Icon' colorScheme='blue'>
                        <SendIcon aria-label='Search Button Icon' />
                    </Button>
                </Flex>
            </Box>
        </AbsoluteCenter>
    )
}