import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export const createPost = async ({ username, title, tags, content }: CreatePostArgs) => {
    return await addDoc(collection(db, 'posts'), {
        username, title, tags, content, comments: [], creationDate: Timestamp.fromDate(new Date())
    })
}