import { useSession } from '../../hooks/useSession'
import useLoginModal from '../../hooks/useLoginModal'

import LibraryHeader from './LibraryHeader'
import LibraryItem from './LibraryItem'
import LibraryItemLoading from './LibraryItemLoading'
import LibraryEmpty from './LibraryEmpty'

const Library = () => {
    const { session } = useSession()
    const loginModal = useLoginModal()

    const createPlaylist = () => {
        if (!session) {
            return loginModal.onOpen()
        }

        // TODO: playlistModal.onOpen()
        console.log('Open playlist modal')
    }

    const searchPodcasts = () => {
        if (!session) {
            return loginModal.onOpen()
        }

        // TODO: search podcasts functionality
        console.log('Search for podcasts')
    }

    // TODO: library data handling
    const playlistData = false

    return (
        <div className="relative flex h-full flex-col">
            <LibraryHeader fns={[createPlaylist]} />

            <div className="h-full px-2">
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
            </div>
        </div>
    )
}

export default Library
