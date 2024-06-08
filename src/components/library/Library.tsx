import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

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

    // TODO: library data handling
    const playlistData = true

    return (
        <div className="relative flex h-full flex-col">
            <LibraryHeader fns={[createPlaylist]} />
            <ScrollArea className="h-full px-2">
                {playlistData ? (
                    <>
                        <LibraryItem
                            image={'./src/assets/images/liked.png'}
                            title={'Playlist #33'}
                            author={'Ben Allenden'}
                            href={''}
                        />
                        <LibraryItemLoading />
                    </>
                ) : (
                    <LibraryEmpty fns={[createPlaylist, searchPodcasts]} />
                )}
            </ScrollArea>
        </div>
    )
}

export default Library
