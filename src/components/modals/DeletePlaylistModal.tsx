import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import updateLibrary from '../../api/user/UserLibraryUpdate'

import useDeletePlaylistModal from '../../hooks/useDeletePlaylistModal'

import Modal from './Modal'
import Button from '../Button'

const DeletePlaylistModal = () => {
    const { isOpen, onClose } = useDeletePlaylistModal()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split('/')[2] // Parse playlist id from page URL

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    const deleteUserPlaylist = useMutation({
        mutationFn: async () => updateLibrary(true, 'playlist', id),
        onSuccess: () => {
            onClose()
            navigate('/')
            toast.success('Removed to Your Library')
            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            className="
                bg-white
                py-8
                transition
                lg:max-w-[400px]
                lg:p-8
            "
        >
            <div className="flex flex-col gap-y-2 text-black">
                <h2 className="text-2xl font-extrabold">Delete from Your Library?</h2>
                <p className="text-sm">
                    This will <b>delete the playlist</b> from <b>Your Library</b>.
                </p>
                <Button
                    onClick={() => deleteUserPlaylist.mutate()}
                    className="mt-6"
                >
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default DeletePlaylistModal
