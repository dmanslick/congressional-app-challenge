import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
    return auth.signOut()
}

export const register = async (email: string, password: string, username: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser!, {
            displayName: username,
        })
    })
}
