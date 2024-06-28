import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'
import { twMerge } from 'tailwind-merge'

import { VscEllipsis } from 'react-icons/vsc'

import updateLibrary from '../api/user/UserLibraryUpdate'

import { User } from '../types/User'
import { PlaylistSimplified } from '../types/Playlist'
import { Album } from '../types/Album'
import { Artist } from '../types/Artist'

import PlayButton from './PlayButton'
import FollowButton from './FollowButton'
import LibraryButton from './LibraryButton'
import OptionsMenu from './menus/OptionsMenu'
import Tooltip from './Tooltip'

interface ActionBarProps {
    user: User
    library: Album[] | Artist[] | PlaylistSimplified[]
    content: Album | Artist | PlaylistSimplified
    className?: string
}

const ActionBar: React.FC<ActionBarProps> = ({ user, library, content, className }) => {
    const [userOwned, setUserOwned] = useState(false)
    const [inLibrary, setInLibrary] = useState(false)
    const queryClient = useQueryClient()

    const updateUserLibrary = useMutation({
        mutationFn: async () => updateLibrary(inLibrary, content.type, content.id),
        onSuccess: () => {
            if (inLibrary) {
                setInLibrary(false)
                toast.success('Removed from Your Library')
            } else {
                setInLibrary(true)
                toast.success('Added to Your Library')
            }

            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceUpdateUserLibrary = debounce(() => updateUserLibrary.mutate(), 100)

    useEffect(() => {
        // Check if the content is a playlist and owner by the authenticated user.
        if (content.type === 'playlist') {
            const playlist = library.find((item): item is PlaylistSimplified => item.id === content.id)
            if (playlist && playlist.owner.id === user.id) {
                setUserOwned(true)
            } else setUserOwned(false)
        }
        // Check if the content is in the authenticated user's library.
        if (library.some((item) => item.id === content.id)) {
            return setInLibrary(true)
        } else return setInLibrary(false)
    }, [user, library, content])

    return (
        <>
            <div className={twMerge('flex h-20 items-center justify-between py-4', className)}>
                <div className="flex items-center">
                    <PlayButton
                        contentId={''}
                        size={24}
                        className="mr-6 shadow-md shadow-black/30"
                    />
                    {!userOwned &&
                        (content.type === 'artist' ? (
                            <FollowButton
                                onClick={debounceUpdateUserLibrary}
                                disabled={updateUserLibrary.isPending}
                                inLibrary={inLibrary}
                                className="mr-6"
                            />
                        ) : (
                            <LibraryButton
                                inLibrary={inLibrary}
                                onClick={debounceUpdateUserLibrary}
                                disabled={updateUserLibrary.isPending}
                                className="mr-6 shadow-md shadow-black/30 disabled:opacity-50"
                                size={24}
                            />
                        ))}

                    {/* TODO: replace with ellipsis popup menu and include external link on the menu */}
                    {/* TODO: Add user-owned playlist options (rename, edit, delete, etc.) */}
                    <OptionsMenu
                        userOwned={userOwned}
                        url={content.external_urls.spotify}
                        uri={content.uri}
                    >
                        <button>
                            <Tooltip message={`More options for ${content.name}`}>
                                <span>
                                    <VscEllipsis
                                        size={30}
                                        className="
                                            cursor-pointer
                                            text-neutral-400
                                            transition
                                            hover:scale-105
                                            hover:text-white
                                        "
                                    />
                                </span>
                            </Tooltip>
                        </button>
                    </OptionsMenu>
                </div>
            </div>
        </>
    )
}

export default ActionBar
