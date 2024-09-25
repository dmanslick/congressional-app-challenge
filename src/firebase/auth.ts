import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

export const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
    auth.signOut()
}

export const register = async (data: RegisterArgs) => {
    sessionStorage.setItem('displayName', data['Name'])
    const result = await createUserWithEmailAndPassword(auth, data['Email'], data['Password'])
    const { uid } = result.user
    await updateProfile(result.user, {
        displayName: data['Name'],
    })
    await setDoc(doc(db, 'profiles', uid), { ...data, ...{ creationDate: Timestamp.fromDate(new Date()) } })
}