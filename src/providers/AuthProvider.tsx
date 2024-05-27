import React from 'react'
import { AuthContextProvider } from '../hooks/useAuth'

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <>
            <AuthContextProvider>{children}</AuthContextProvider>
        </>
    )
}

export default AuthProvider
