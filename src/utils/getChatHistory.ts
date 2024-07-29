import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export const getChatHistory = async (uid: string) => {
    const chatHistory = await getDoc(doc(db, 'posts', uid))
    return chatHistory.data() as ChatMessage[]
}