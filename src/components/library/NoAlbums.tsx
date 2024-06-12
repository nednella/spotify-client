import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoAlbums = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const searchAlbums = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: search album functionality
        console.log('Search for albums')
    }

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate text-wrap font-bold">Let's find some new albums</h3>
            <p className="mt-2 text-sm font-normal">We'll show you what's popular</p>
            <Button
                onClick={searchAlbums}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Browse albums
            </Button>
        </Container>
    )
}

export default NoAlbums
