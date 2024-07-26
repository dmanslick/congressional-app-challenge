/// <reference types="vite/client" />

interface Post {
    id: string
    creationDate: {
        seconds: number,
        nanoseconds: number
    }
    title: string
    content: string
    tags: string[]
    comments: string[]
}

interface PostComment {
    username: string,
    content: string
}

interface CreateCommentArgs {
    id: string
    username: string
    content: string
}

interface ChatMessage {
    role: 'user' | 'model'
    parts: { text: string }[]
}