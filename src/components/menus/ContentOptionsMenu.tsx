import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { HiOutlinePencil } from 'react-icons/hi2'
import { MdDeleteOutline } from 'react-icons/md'
import { FaSpotify } from 'react-icons/fa'

import useEditPlaylistModal from '../../hooks/useEditPlaylistModal'
import useDeletePlaylistModal from '../../hooks/useDeletePlaylistModal'

interface OptionsMenuProps {
    isUserCreated: boolean
    url: string
    uri: string
    children: React.ReactNode
}
const OptionsMenu: React.FC<OptionsMenuProps> = ({ isUserCreated, url, uri, children }) => {
    const editPlaylistModal = useEditPlaylistModal()
    const deletePlaylistModal = useDeletePlaylistModal()

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
                    align={'start'}
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
                                <button
                                    onClick={() => editPlaylistModal.onOpen()}
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
                                    <HiOutlinePencil className="size-5 text-neutral-400" />
                                    <span className="text-sm font-normal text-neutral-200">Edit playlist details</span>
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="outline-none">
                                <button
                                    onClick={() => deletePlaylistModal.onOpen()}
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
                                    <span className="text-sm font-normal text-neutral-200">Delete playlist</span>
                                </button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="m-[5px] h-[1px] bg-neutral-600" />
                        </>
                    )}
                    <DropdownMenu.Item className="outline-none">
                        <a
                            href={url}
                            target="_blank"
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
                            <span className="text-sm font-normal text-neutral-200">Open in web app</span>
                        </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none">
                        <a
                            href={uri}
                            target="_blank"
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
                            <span className="text-sm font-normal text-neutral-200">Open in desktop app</span>
                        </a>
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
