import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export const getPosts = async () => {
    const posts: Post[] = []
    const snapshot = await getDocs(collection(db, 'posts'))
    snapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data() } as Post)
    })
    return posts
}