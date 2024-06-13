import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoFollowedPlaylists = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const searchPlaylists = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: search playlist functionality
        console.log('Search for playlists')
    }

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate text-wrap font-bold">Let's find some playlists to follow</h3>
            <p className="mt-2 text-sm font-normal">We'll even make some for you weekly</p>
            <Button
                onClick={searchPlaylists}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Browse playlists
            </Button>
        </Container>
    )
}

export default NoFollowedPlaylists
