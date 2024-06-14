import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from './useAuth'
import { Library } from '../types/Library'
import userLibrary from '../api/user/UserLibrary'

type LibraryContextType = {
    data: Library
    isLoading: boolean
    isError: boolean
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined)

export const LibraryContextProvider = ({ ...props }) => {
    const { user } = useAuth()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', 'playlists'],
        queryFn: async () => {
            const response = await userLibrary()
            return response.data
        },
        enabled: user !== null,
    })

    return (
        <LibraryContext.Provider
            value={{ data, isLoading, isError }}
            {...props}
        />
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLibrary = () => {
    const context = useContext(LibraryContext)
    if (context === undefined) {
        throw new Error('useLibrary must be used within a LibraryContextProvider')
    }

    return context
}
