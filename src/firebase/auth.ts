import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
    auth.signOut()
}

export const register = async (email: string, password: string, username: string) => {
    sessionStorage.setItem('displayName', username)
    createUserWithEmailAndPassword(auth, email, password).then(result => {
        updateProfile(result.user, {
            displayName: username,
        })
    })
}