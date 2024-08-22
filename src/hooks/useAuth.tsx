import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { User } from '../types/User'

import getSession from '../api/auth/Session'
import Callback from '../api/auth/Callback'
import _Logout from '../api/auth/Logout'

import { pausePlayer } from './usePlayer'

import AppLoading from '../app/AppLoading'

type AuthContextType = {
    user: User | null
    Login: () => void
    Logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ ...props }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // Grab session on page load
    // TODO: useQuery is not returning a data property for use, causing an error
    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            setUser(await getSession())
        },
    })

    const Login = async () => {
        try {
            await Callback()
            setUser(await getSession()) // grab user without having to reload page
            window.history.pushState({}, '', '/') // clear nav history after successful login to prevent /callback API re-fire
            navigate('/')
        } catch {
            navigate('/')
        }
    }

    const Logout = async () => {
        pausePlayer()
        await _Logout()
        setUser(null)
        queryClient.removeQueries() // clear all cached data upon logout
        navigate('/')
    }

    if (isLoading) return <AppLoading />

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
