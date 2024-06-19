import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaRegClock } from 'react-icons/fa'

import { Track } from '../../types/Track'

import TrackListItem from './TrackListItem'

interface TrackListProps {
    title: string
    songs: Track[]
    header: boolean
    album: boolean
}

const TrackList: React.FC<TrackListProps> = ({ title, songs, header, album }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    // TODO: handle click outside of TrackList --> remove selected

    const handleSelect = (index: number) => {
        if (selectedIndex === index) {
            // TODO: playSong
            return setSelectedIndex(null)
        }
        setSelectedIndex(index)
    }
    return (
        <>
            <p className="mb-4 mt-2 select-none text-2xl font-bold">{title}</p>
            <TrackListHeader
                display={header}
                album={album}
            >
                <p className="justify-self-end text-base">#</p>
                <p>Title</p>
                {album && <p className="hidden md:block">Album</p>}
                <p className="justify-self-center">
                    <FaRegClock size={16} />
                </p>
            </TrackListHeader>
            <div className="mb-4 rounded-md border border-transparent">
                {songs.map((song, index) => (
                    <TrackListItem
                        key={index}
                        index={index}
                        song={song}
                        album={album}
                        selected={selectedIndex === index}
                        onSelect={handleSelect}
                    ></TrackListItem>
                ))}
            </div>
        </>
    )
}

export default TrackList

interface TrackListHeader {
    className?: string
    children: React.ReactNode
    display: boolean
    album: boolean
}

const TrackListHeader: React.FC<TrackListHeader> = ({ className, children, display, album }) => {
    return display ? (
        <div
            data-display-album={album}
            className={twMerge(
                `
                    mb-2
                    grid
                    select-none
                    grid-cols-[16px_minmax(120px,6fr)_40px]
                    items-center
                    gap-x-4
                    border-b
                    border-neutral-400/50
                    px-4
                    text-sm
                    font-normal
                    text-neutral-400
                    md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,5fr)_40px]
                `,
                className
            )}
        >
            {children}
        </div>
    ) : null
}
