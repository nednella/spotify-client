import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MdDeleteOutline } from 'react-icons/md'
import { FaSpotify } from 'react-icons/fa'
import removePlaylistItem from '../../api/playlist/removePlaylistItem'

interface OptionsMenuProps {
    isUserCreated: boolean
    url: string
    uri: string
    children: React.ReactNode
}
const OptionsMenu: React.FC<OptionsMenuProps> = ({ isUserCreated, url, uri, children }) => {
    const queryClient = useQueryClient()
    const location = useLocation()
    const id = location.pathname.split('/')[2] // Parse playlist id from page URL

    const removeTrack = useMutation({
        mutationFn: async () => removePlaylistItem(id, uri),
        onSuccess: () => {
            toast.success('Track removed from playlist')
            queryClient.refetchQueries({ queryKey: ['playlist', id], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className="outline-none"
                asChild
            >
                {children}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={5}
                    className="
                        relative
                        z-50
                        h-fit
                        w-fit
                        rounded-sm
                        bg-neutral-800
                        p-1
                        shadow-lg
                        shadow-neutral-900
                        transition
                    "
                >
                    {isUserCreated && (
                        <>
                            <DropdownMenu.Item className="outline-none">
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-full
                                        cursor-pointer
                                        items-center
                                        gap-x-3
                                        rounded-b-sm
                                        px-3
                                        hover:bg-neutral-700
                                    "
                                >
                                    <MdDeleteOutline className="size-5 text-neutral-400" />
                                    <button
                                        onClick={() => removeTrack.mutate()}
                                        className="text-sm font-normal text-neutral-200"
                                    >
                                        Remove from this playlist
                                    </button>
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="m-[5px] h-[1px] bg-neutral-600" />
                        </>
                    )}
                    <DropdownMenu.Item className="outline-none">
                        <div
                            className="
                                flex
                                h-10
                                w-full
                                cursor-pointer
                                items-center
                                gap-x-3
                                rounded-b-sm
                                px-3
                                hover:bg-neutral-700
                            "
                        >
                            <FaSpotify className="size-5 text-neutral-400" />
                            <a
                                href={url}
                                target="_blank"
                                className="text-sm font-normal text-neutral-200"
                            >
                                Open in web app
                            </a>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none">
                        <div
                            className="
                                flex
                                h-10
                                w-full
                                cursor-pointer
                                items-center
                                gap-x-3
                                rounded-b-sm
                                px-3
                                hover:bg-neutral-700
                            "
                        >
                            <FaSpotify className="size-5 text-neutral-400" />
                            <a
                                href={uri}
                                target="_blank"
                                className="text-sm font-normal text-neutral-200"
                            >
                                Open in desktop app
                            </a>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow
                        height={8}
                        width={12}
                        className="fill-neutral-800"
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default OptionsMenu
