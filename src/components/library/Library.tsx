import { useAuth } from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

import useLoginModal from '../../hooks/useLoginModal'
import userLibrary from '../../api/user/UserLibrary'

import LibraryHeader from './LibraryHeader'
import LibraryContent from './LibraryContent'
import LibraryEmpty from './LibraryEmpty'

import LibraryItemLoading from './LibraryItemLoading'
import ScrollArea from '../ScrollArea'

const Library = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const createPlaylist = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: playlistModal.onOpen()
        console.log('Open playlist modal')
    }

    const searchPodcasts = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: search podcasts functionality
        console.log('Search for podcasts')
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', 'playlists'],
        queryFn: async () => {
            const response = await userLibrary()
            return response.data
        },
        enabled: user !== null,
    })

    return (
        <div className="relative flex h-full flex-col">
            <LibraryHeader fns={[createPlaylist]} />
            <ScrollArea className="h-full w-full px-2">
                {isLoading ? (
                    <>
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                        <LibraryItemLoading />
                    </>
                ) : isError ? (
                    <p className="mt-4 text-center font-medium text-neutral-400">
                        Oops, something went wrong.
                    </p>
                ) : user && data ? (
                    <LibraryContent
                        user={user}
                        data={data}
                    />
                ) : (
                    <LibraryEmpty fns={[createPlaylist, searchPodcasts]} />
                )}
            </ScrollArea>
        </div>
    )
}

export default Library
