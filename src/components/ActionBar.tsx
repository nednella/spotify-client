import React, { useEffect, useState } from 'react'

import { PlaylistSimplified } from '../types/Playlist'
import { Album } from '../types/Album'
import { Artist } from '../types/Artist'

import Button from './Button'
import PlayButton from './PlayButton'
import LibraryButton from './LibraryButton'
import { twMerge } from 'tailwind-merge'

interface ActionBarProps {
    libraryData: PlaylistSimplified[] | Album[] | Artist[]
    contentType: 'playlist' | 'album' | 'artist'
    contentId: string
    className?: string
}

const ActionBar: React.FC<ActionBarProps> = ({ libraryData, contentType, contentId, className }) => {
    const [isPlaying] = useState(false)
    const [inLibrary, setInLibrary] = useState(false)

    // TODO: isPlaying functionality
    // TODO: web socket to catch playing state

    useEffect(() => {
        if (libraryData.some((item) => item.id === contentId)) {
            setInLibrary(true)
        }
    }, [libraryData, contentId])

    const addToLibrary = () => {
        if (inLibrary) {
            // TODO: PUT request to Spotify API
            // TODO: Toaster 'Added to library' on success
            // on return of success, setInLibrary(false)
            setInLibrary(false)
        } else {
            // TODO: PUT request to Spotify API
            // TODO: Toaster 'Removed from library' on success
            // on return of success, setInLibrary(true)
            setInLibrary(true)
        }
    }

    return (
        <>
            <div className={twMerge('flex h-20 items-center py-4', className)}>
                {/* Play/pause button */}
                <span className="mr-6">
                    {isPlaying ? (
                        <PlayButton
                            size={24}
                            isPlaying={true}
                            className="shadow-black/30"
                        />
                    ) : (
                        <PlayButton
                            size={24}
                            isPlaying={false}
                            className="shadow-black/30"
                        />
                    )}
                </span>

                {/* Add/remove from library */}
                {contentType === 'artist' ? (
                    <Button
                        className="
                            mr-6
                            w-fit
                            border
                            border-neutral-500
                            bg-transparent
                            px-5
                            py-1
                            text-white
                            hover:border-white
                            hover:opacity-100
                        "
                        onClick={addToLibrary}
                    >
                        {inLibrary ? <p className="font-bold">Following</p> : <p>Follow</p>}
                    </Button>
                ) : inLibrary ? (
                    <LibraryButton
                        inLibrary={true}
                        size={24}
                    />
                ) : (
                    <LibraryButton
                        inLibrary={false}
                        size={24}
                    />
                )}
            </div>
        </>
    )
}

export default ActionBar
