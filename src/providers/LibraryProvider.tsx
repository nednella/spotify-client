import React from 'react'
import { LibraryContextProvider } from '../hooks/useLibrary'

interface LibraryProviderProps {
    children: React.ReactNode
}

const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
    return (
        <>
            <LibraryContextProvider>{children}</LibraryContextProvider>
        </>
    )
}

export default LibraryProvider
