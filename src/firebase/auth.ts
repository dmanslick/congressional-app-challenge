import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
    auth.signOut()
}

export const register = async (data: RegisterArgs) => {
    sessionStorage.setItem('displayName', data['Name'])
    createUserWithEmailAndPassword(auth, data['Email'], data['Password']).then(result => {
        updateProfile(result.user, {
            displayName: data['Name'],
        })
    })
}