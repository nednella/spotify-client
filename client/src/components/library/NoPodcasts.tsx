import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoPodcasts = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const searchPodcasts = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: search podcast functionality
        console.log('Search for podcasts')
    }

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate text-wrap font-bold">Let's find some podcasts to follow</h3>
            <p className="mt-2 text-sm font-semibold">We'll keep you updated on new episodes</p>
            <Button
                onClick={searchPodcasts}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Browse podcasts
            </Button>
        </Container>
    )
}

export default NoPodcasts
