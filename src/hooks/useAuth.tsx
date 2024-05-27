import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import getSession from '../api/auth/Session'

import AppSkeleton from '../app/AppSkeleton'

export const AuthContext = createContext(undefined)

export const AuthContextProvider = ({ ...props }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const data = await getSession()
            return JSON.parse(data)
        },
    })

    if (isLoading) {
        return (
            <>
                <AppSkeleton />
            </>
        )
    }

    return (
        <AuthContext.Provider
            value={data}
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
