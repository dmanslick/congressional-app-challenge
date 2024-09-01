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
    comments: PostComment[]
    username: string
}

interface PostComment {
    username: string
    content: string
    id: string
}

interface CreateCommentArgs {
    id: string
    username: string
    content: string
    commentId: string
}

interface ChatMessage {
    role: 'user' | 'model'
    text: string
}

interface CreatePostArgs {
    username: string,
    title: string,
    tags: string[],
    content: string
}

interface DeleteCommentArgs {
    username: string
    content: string
    id: string,
    postId: string
}

interface DeletePostArgs {
    id: string
}

interface RegisterArgs {
    'Name': string
    'Email': string
    'Password': string
    'Child Name': string
    'Child Age': string
    'Diagnosis Date': string
    'Sensory Sensitivities': string
    'Current Therapies': string
    'Preferred Calming Techniques': string
}