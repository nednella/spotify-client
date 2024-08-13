import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'
import { twMerge } from 'tailwind-merge'

import { VscEllipsis } from 'react-icons/vsc'

import updateLibrary from '../api/user/UserLibraryUpdate'

import { SimplifiedPlaylist } from '../types/Playlist'
import { Album } from '../types/Album'
import { Artist } from '../types/Artist'

import PlayButton from './PlayButton'
import FollowButton from './FollowButton'
import LibraryButton from './LibraryButton'
import OptionsMenu from './menus/ContentOptionsMenu'
import Tooltip from './Tooltip'

interface ActionBarProps {
    library: Album[] | Artist[] | SimplifiedPlaylist[]
    content: Album | Artist | SimplifiedPlaylist
    isUserCreated: boolean
    className?: string
}

const ActionBar: React.FC<ActionBarProps> = ({ library, content, isUserCreated, className }) => {
    const [isInLibrary, setisInLibrary] = useState(false)
    const queryClient = useQueryClient()

    const updateUserLibrary = useMutation({
        mutationFn: async () => updateLibrary(isInLibrary, content.type, content.id),
        onSuccess: () => {
            if (isInLibrary) {
                setisInLibrary(false)
                toast.success('Removed from Your Library')
            } else {
                setisInLibrary(true)
                toast.success('Added to Your Library')
            }
            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceUpdateUserLibrary = debounce(() => updateUserLibrary.mutate(), 300)

    useEffect(() => {
        // Check if the content is in the authenticated user's library.
        if (library.some((item) => item.id === content.id)) {
            return setisInLibrary(true)
        } else return setisInLibrary(false)
    }, [library, content])

    return (
        <>
            <div className={twMerge('flex h-20 items-center justify-between py-4', className)}>
                <div className="flex items-center">
                    <PlayButton
                        contextUri={content.uri}
                        size={24}
                        className="mr-6 shadow-md shadow-black/30"
                    />
                    {!isUserCreated &&
                        (content.type === 'artist' ? (
                            <FollowButton
                                isInLibrary={isInLibrary}
                                onClick={debounceUpdateUserLibrary}
                                disabled={updateUserLibrary.isPending}
                                className="mr-6"
                            />
                        ) : (
                            <LibraryButton
                                isInLibrary={isInLibrary}
                                onClick={debounceUpdateUserLibrary}
                                disabled={updateUserLibrary.isPending}
                                className="mr-6 shadow-md shadow-black/30 disabled:opacity-50"
                                size={24}
                            />
                        ))}
                    <OptionsMenu
                        isUserCreated={isUserCreated}
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
