import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoArtists = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const searchArtists = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: search artist functionality
        console.log('Search for artists')
    }

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate text-wrap font-bold">Let's find some new Artists</h3>
            <p className="mt-2 text-sm font-normal">We'll keep you updated on their newest releases</p>
            <Button
                onClick={searchArtists}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Browse artists
            </Button>
        </Container>
    )
}

export default NoArtists
