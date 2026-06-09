import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'

import createPlaylist from '../../api/playlist/createPlaylist'

import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import Container from '../Container'
import Button from '../Button'

const NoPlaylists = () => {
    const { user } = useAuth()
    const loginModal = useLoginModal()
    const queryClient = useQueryClient()

    const onCreatePlaylistClick = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        debounceCreateUserPlaylist()
    }

    const createUserPlaylist = useMutation({
        mutationFn: async () => createPlaylist('My Playlist #1', ''),
        onSuccess: () => {
            toast.success('Playlist created')
            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceCreateUserPlaylist = debounce(() => createUserPlaylist.mutate(), 300)

    return (
        <Container className="select-none overflow-hidden bg-neutral-800 p-4">
            <h3 className="textlg truncate font-bold">Create your first playlist</h3>
            <p className="mt-2 text-sm font-normal">It's easy, we'll help you</p>
            <Button
                onClick={onCreatePlaylistClick}
                className="mt-4 w-fit bg-white px-4 py-1"
            >
                Create playlist
            </Button>
        </Container>
    )
}

export default NoPlaylists
