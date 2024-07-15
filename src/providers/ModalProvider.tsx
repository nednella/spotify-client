import LoginModal from '../components/modals/LoginModal'
import DeletePlaylistModal from '../components/modals/DeletePlaylistModal'

const ModalProvider = () => {
    return (
        <>
            <LoginModal />
            <DeletePlaylistModal />
        </>
    )
}

export default ModalProvider
