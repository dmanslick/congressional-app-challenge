import { useEffect, useState } from 'react'
import { auth } from './firebase'
import { User } from 'firebase/auth'

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [idToken, setIdToken] = useState<any>()

    useEffect(() => {
        const unsubscribe = () => {
            auth.onAuthStateChanged(user => {
                setUser(user)
                auth.currentUser?.getIdToken(true).then(token => {
                    setIdToken(token)
                })
            })

        }

        return unsubscribe
    }, [])

    // useEffect(() => {
    //     console.log(user)
    // }, [user])

    return { user, idToken }
}