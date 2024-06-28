import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaRegClock } from 'react-icons/fa'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import { Track } from '../../types/Track'

import BackgroundColour from '../BackgroundColour'
import TrackListItem from './TrackListItem'

interface TrackListProps {
    title?: string
    songs: Track[]
    header: boolean
    sticky?: boolean
    album: boolean
    shallow?: boolean
}

const TrackList: React.FC<TrackListProps> = ({ title, songs, header, sticky, album, shallow }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    // TODO: handle click outside of TrackList --> remove selected
    // TODO: expand/reduce button to change state of displayed items from 5 -> 10 when 'shallow' is enabled

    const handleSelect = (index: number) => {
        if (selectedIndex === index) {
            // TODO: playSong
            return setSelectedIndex(null)
        }
        setSelectedIndex(index)
    }
    return (
        <>
            {title && <p className="mb-4 mt-2 select-none text-2xl font-bold">{title}</p>}
            <TrackListHeader
                display={header}
                sticky={sticky}
                album={album}
            />
            <div className="mb-4 rounded-md border border-transparent">
                {shallow
                    ? songs.slice(0, 5).map((song, index) => (
                          <TrackListItem
                              key={index}
                              index={index}
                              song={song}
                              album={album}
                              selected={selectedIndex === index}
                              onSelect={handleSelect}
                          ></TrackListItem>
                      ))
                    : songs.map((song, index) => (
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
    display: boolean
    sticky?: boolean
    album: boolean
}

const TrackListHeader: React.FC<TrackListHeader> = ({ display, sticky, album }) => {
    const { opacity } = useScrollOpacity()

    return display ? (
        <div
            data-display-album={album}
            className={twMerge(
                `
                    mb-2
                    hidden
                    h-[35px]
                    select-none
                    grid-cols-[16px_minmax(120px,6fr)_80px]
                    items-center
                    gap-x-4
                    border-b
                    border-neutral-400/50
                    px-4
                    text-sm
                    font-normal
                    text-neutral-400
                    md:grid
                    md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,5fr)_80px]
                `,
                sticky && 'sticky top-[64px]',
                opacity === 1 && 'mx-[-16px] px-8'
            )}
        >
            <BackgroundColour
                defaultClr={true}
                opacity={opacity}
                gradient={true}
            />
            <p className="justify-self-end text-base">#</p>
            <p>Title</p>
            {album && <p className="hidden md:block">Album</p>}
            <p className="justify-self-end pr-2">
                <FaRegClock size={16} />
            </p>
        </div>
    ) : null
}
