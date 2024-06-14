import { useAuth } from '../../hooks/useAuth'
import { useLibrary } from '../../hooks/useLibrary'
import useLoginModal from '../../hooks/useLoginModal'

import LibraryHeader from './LibraryHeader'
import LibraryContent from './LibraryContent'
import LibraryEmpty from './LibraryEmpty'
import LibraryItemLoading from './LibraryItemLoading'
import ScrollArea from '../ScrollArea'

const Library = () => {
    const { user } = useAuth()
    const { data, isLoading, isError } = useLibrary()
    const loginModal = useLoginModal()

    const createPlaylist = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: playlistModal.onOpen()
        console.log('Open playlist modal')
    }

    return (
        <div className="relative flex h-full flex-col">
            <LibraryHeader fns={[createPlaylist]} />
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
