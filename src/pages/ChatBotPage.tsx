import { GoogleGenerativeAI } from '@google/generative-ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
    const queryClient = useQueryClient()
    const { data: history } = useQuery({
        queryKey: ['chatHistory', user?.uid],
        queryFn: () => getChatHistory(user?.uid as string)
    })
    const chat = useMemo(() => geminiModel.startChat(), [])

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            queryClient.setQueryData(['chatHistory', user?.uid], (prev: ChatMessage[] | undefined) => {
                if (prev == undefined) return [{ role: 'user', text: message }]
                return [...prev, { role: 'user', text: message }]
            })
            const result = await chat.sendMessage(message)
            return result.response.text()
        },
        onSuccess: (text) => {
            console.log(text)
            queryClient.setQueryData(['chatHistory', user?.uid], (prev: ChatMessage[] | undefined) => {
                if (prev == undefined) return [{ role: 'model', text }]
                return [...prev, { role: 'model', text }]
            })
        },
    })

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <AbsoluteCenter>
            <Box>
                <Box display='flex' flexDir='column-reverse' h='calc(100vh - 112px)' maxW='400px' w='calc(100vw - 1rem)'>
                    {history && [...history].reverse().map(message => {
                        if (message.role == 'model') {
                            return <BotMessage text={message.text} />
                        }
                        return <UserMessage text={message.text} />
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