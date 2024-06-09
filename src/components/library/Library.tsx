import { useAuth } from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

import useLoginModal from '../../hooks/useLoginModal'
import userPlaylists from '../../api/user/UserPlaylists'
import { Playlist } from '../../types/Playlist'

import LibraryHeader from './LibraryHeader'
import LibraryItem from './LibraryItem'
import LibraryItemLoading from './LibraryItemLoading'
import LibraryEmpty from './LibraryEmpty'
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

    const {
        data: playlists,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['user', 'playlists'],
        queryFn: async () => {
            const response = await userPlaylists()
            console.log(response.data)
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
                    </>
                ) : isError ? (
                    <p className="mt-4 text-center font-medium text-neutral-400">
                        Oops, something went wrong.
                    </p>
                ) : playlists ? (
                    playlists.map((playlist: Playlist) => (
                        <LibraryItem
                            key={playlist.id}
                            image={
                                playlist.images && playlist.images.length > 0
                                    ? playlist.images[0].url
                                    : './src/assets/images/placeholder.png'
                            }
                            title={playlist.name}
                            author={playlist.owner.display_name}
                            href={`${playlist.type}/${playlist.id}`}
                        />
                    ))
                ) : (
                    <LibraryEmpty fns={[createPlaylist, searchPodcasts]} />
                )}
            </ScrollArea>
        </div>
    )
}

export default Library
