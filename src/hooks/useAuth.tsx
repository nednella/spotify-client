import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import getSession from '../api/auth/Session'
import Authorise from '../api/auth/Authorise'
import _Logout from '../api/auth/Logout'

import AppSkeleton from '../app/AppSkeleton'

type AuthContextType = {
    user: object | null
    Login: () => void
    Logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ ...props }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Grab session on page load
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const data = await getSession()
            setUser(JSON.parse(data))
        },
    })

    const Login = async () => {
        await Authorise()
        window.history.pushState({}, '', '/') // clear nav history after successful login to prevent /authorise API re-fire
        navigate('/')
        setUser(JSON.parse(await getSession())) // grab new session without having to reload page
    }

    const Logout = async () => {
        await _Logout()
        navigate('/')
        setUser(null)
    }

    if (isLoading) {
        return (
            <>
                <AppSkeleton />
            </>
        )
    }

    return (
        <AuthContext.Provider
            value={{ user, Login, Logout }}
            {...props}
        />
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContextProvider')
    }

    return context
}
