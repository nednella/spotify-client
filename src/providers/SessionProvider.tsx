import React from 'react'
import { SessionContextProvider } from '../hooks/useSession'

interface SessionProviderProps {
    children: React.ReactNode
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    return (
        <>
            <SessionContextProvider>{children}</SessionContextProvider>
        </>
    )
}

export default SessionProvider
