import { useMutation, useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import toast from 'react-hot-toast'

import createPlaylist from '../../api/playlist/createPlaylist'

import { useAuth } from '../../hooks/useAuth'
import { useLibrary } from '../../hooks/useLibrary'
import useLoginModal from '../../hooks/useLoginModal'

import { generatePlaylistName } from '../../common/generatePlaylistName'

import LibraryHeader from './LibraryHeader'
import ScrollArea from '../ScrollArea'
import LibraryContent from './LibraryContent'
import LibraryEmpty from './LibraryEmpty'
import LibraryItemLoading from './LibraryItemLoading'

const Library = () => {
    const { user } = useAuth()
    const { data, isLoading, isError } = useLibrary()
    const loginModal = useLoginModal()
    const queryClient = useQueryClient()

    const onCreatePlaylistClick = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        debounceCreateUserPlaylist()
    }

    const createUserPlaylist = useMutation({
        mutationFn: async () => createPlaylist(generatePlaylistName(user!.id, data.playlists), ''),
        onSuccess: () => {
            toast.success('Playlist created')
            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceCreateUserPlaylist = debounce(() => createUserPlaylist.mutate(), 300)

    return (
        <div className="relative flex h-full flex-col">
            <LibraryHeader fns={[onCreatePlaylistClick]} />
            <ScrollArea className="h-full w-full px-2">
                {user ? (
                    isLoading ? (
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
                        <p className="mt-4 text-center font-medium text-neutral-400">Oops, something went wrong.</p>
                    ) : data ? (
                        <LibraryContent
                            user={user}
                            data={data}
                        />
                    ) : (
                        <LibraryEmpty />
                    )
                ) : (
                    <LibraryEmpty />
                )}
            </ScrollArea>
        </div>
    )
}

export default Library
