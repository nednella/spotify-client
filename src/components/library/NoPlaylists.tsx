import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoPlaylists = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const createPlaylist = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: playlistModal.onOpen()
        console.log('Open playlist modal')
    }

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate font-bold">Create your first playlist</h3>
            <p className="mt-2 text-sm font-normal">It's easy, we'll help you</p>
            <Button
                onClick={createPlaylist}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Create playlist
            </Button>
        </Container>
    )
}

export default NoPlaylists
