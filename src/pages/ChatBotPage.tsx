import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState } from 'react'


const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
}

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })

export default function ChatBotPage() {
    const [message, setMessage] = useState('')
    const [result, setResult] = useState({})

    const sendMessage = async () => {
        const responseData: any = await model.generateContent(message)
        const text = responseData.response.candidates[0].content.parts[0].text
    }

    return (
        <div style={{ marginTop: 56 }}>
            <pre>{JSON.stringify(result)}</pre>
            <input type='text' onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send message</button>
        </div>
    )
}