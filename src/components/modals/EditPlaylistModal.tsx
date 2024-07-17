import * as Form from '@radix-ui/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

import { BsExclamationCircle } from 'react-icons/bs'

import updatePlaylist from '../../api/playlist/updatePlaylist'

import useEditPlaylistModal from '../../hooks/useEditPlaylistModal'

import Modal from './Modal'
import Button from '../Button'

const EditPlaylistModal = () => {
    const { isOpen, onClose } = useEditPlaylistModal()
    const queryClient = useQueryClient()
    const location = useLocation()
    const id = location.pathname.split('/')[2] // Parse playlist id from page URL

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent page reload
        const data = Object.fromEntries(new FormData(e.currentTarget))
        updatePlaylistDetails.mutate({ name: data.name as string, description: data.description as string })
    }

    const updatePlaylistDetails = useMutation({
        mutationFn: async (params: { name: string; description: string }) =>
            updatePlaylist(id, params.name, params.description),
        onSuccess: () => {
            onClose()
            toast.success('Playlist details updated')
            queryClient.refetchQueries({ queryKey: ['playlist', id], type: 'active' })
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
                bg-neutral-800
                py-8
                transition
                lg:max-w-[400px]
                lg:p-8
            "
        >
            <div className="flex flex-col gap-y-2">
                <h2 className="mb-4 text-2xl font-extrabold">Edit playlist details</h2>
                <Form.Root onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field
                        className="mb-4 grid"
                        name="name"
                    >
                        <Form.Message
                            className="
                                mb-2
                                flex
                                gap-x-2
                                rounded-sm
                                bg-red-700
                                p-2
                                text-xs
                                text-white
                            "
                            match="valueMissing"
                        >
                            <BsExclamationCircle size={16} />
                            Playlist name is required.
                        </Form.Message>
                        <Form.Control asChild>
                            <input
                                className="
                                    selected:bg-neutral-700
                                    inline-flex
                                    h-10
                                    w-full
                                    appearance-none
                                    items-center
                                    justify-center
                                    rounded-sm
                                    bg-neutral-600
                                    px-3
                                    text-sm
                                    leading-none
                                    text-white
                                    outline-none
                                    invalid:border-green-500
                                "
                                placeholder="Add a name"
                                type="text"
                                autoComplete="off"
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field
                        className="mb-4 grid"
                        name="description"
                    >
                        <Form.Control asChild>
                            <textarea
                                className="
                                    inline-flex
                                    h-28
                                    w-full
                                    resize-none
                                    appearance-none
                                    items-center
                                    justify-center
                                    rounded-sm
                                    bg-neutral-600
                                    p-3
                                    text-sm
                                    leading-none
                                    text-white
                                    outline-none
                                "
                                placeholder="Add an optional description"
                            />
                        </Form.Control>
                    </Form.Field>
                    <p className="mb-4 text-xs">
                        Changes usually take a minute to reflect in the Spotify API, so they won't be visible
                        immediately.
                    </p>
                    <Form.Submit asChild>
                        <Button className="bg-white">Save</Button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </Modal>
    )
}

export default EditPlaylistModal
