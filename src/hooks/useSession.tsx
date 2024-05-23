import { createContext, useContext, useEffect, useState } from 'react'

import checkSession from '../api/Session'

type SessionContextType = {
    session: boolean
    setSession: (prop: boolean) => void
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionContextProvider = ({ ...props }) => {
    const [session, setSession] = useState(false)

    useEffect(() => {
        if (!session) {
            checkSession().then((response: boolean) => {
                setSession(response)
                console.log('user state: ', session)
            })
        }
    })

    return (
        <SessionContext.Provider
            value={{ session, setSession }}
            {...props}
        />
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionContextProvider')
    }

    return context
}
