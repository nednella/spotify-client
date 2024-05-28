import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { User } from '../types/User'

import getSession from '../api/auth/Session'
import Authorise from '../api/auth/Authorise'
import _Logout from '../api/auth/Logout'

import AppSkeleton from '../components/AppSkeleton'

type AuthContextType = {
    user: User | null
    Login: () => void
    Logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ ...props }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Grab session on page load
    // TODO: useQuery is not returning a data property for use, causing an error
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            setUser(await getSession())
        },
    })

    const Login = async () => {
        await Authorise()
        setUser(await getSession()) // grab user without having to reload page
        window.history.pushState({}, '', '/') // clear nav history after successful login to prevent /authorise API re-fire
        navigate('/')
    }

    const Logout = async () => {
        await _Logout()
        setUser(null)
        navigate('/')
    }

    if (isLoading) return <AppSkeleton />

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
