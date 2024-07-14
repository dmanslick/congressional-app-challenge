import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { User } from 'firebase/auth'

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [idToken, setIdToken] = useState<any>()

    useEffect(() => {
        const unsubscribe = () => {
            auth.onAuthStateChanged(user => {
                if (user != null && user.displayName == null) {
                    const displayName = sessionStorage.getItem('displayName')
                    user = { ...user, displayName }
                }
                setUser(user)
                auth.currentUser?.getIdToken(true).then(token => {
                    setIdToken(token)
                })
            })
        }

        return unsubscribe
    }, [])


    return { user, idToken }
}