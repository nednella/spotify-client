import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

import useLoginModal from '../hooks/useLoginModal'

import Container from './Container'
import Button from './Button'

const Library = () => {
    // TODO: obtain user & playlist data
    const user = false
    const playlistData = false

    const loginModal = useLoginModal()
    // TODO: playlistModal

    const createPlaylist = () => {
        if (!user) {
            loginModal.onOpen()
        }

        // TODO: playlistModal.onOpen()
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist
                        size={26}
                        className="text-neutral-400"
                    />
                    <p className="text-md font-medium text-neutral-400">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={createPlaylist}
                    size={20}
                    className="cursor-pointer text-neutral-400 hover:text-white"
                />
            </div>

            <div className="flex flex-col gap-y-2 px-2 pt-4">
                {playlistData ? (
                    <p>Library Components</p>
                ) : (
                    <Container className="bg-neutral-800 p-4">
                        <h3 className="textlg font-bold">Create your first playlist</h3>
                        <p className="mt-2 text-sm font-semibold">It's easy, we'll help you</p>
                        <Button
                            onClick={createPlaylist}
                            className="mt-4 w-fit bg-white px-4 py-1"
                        >
                            Create playlist
                        </Button>
                    </Container>
                )}
            </div>
        </div>
    )
}

export default Library
