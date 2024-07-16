import LoginModal from '../components/modals/LoginModal'
import EditPlaylistModal from '../components/modals/EditPlaylistModal'
import DeletePlaylistModal from '../components/modals/DeletePlaylistModal'

const ModalProvider = () => {
    return (
        <>
            <LoginModal />
            <EditPlaylistModal />
            <DeletePlaylistModal />
        </>
    )
}

export default ModalProvider
