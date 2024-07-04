import React, { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaRegClock } from 'react-icons/fa'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import { PlaylistTrack, SavedTrack, SimplifiedTrack, Track } from '../../types/Track'

import BackgroundColour from '../BackgroundColour'
import TrackListItem from './TrackListItem'
import { useClickOutside } from '../../hooks/useClickOutside'

interface TrackListProps {
    title?: string
    tracks: PlaylistTrack[] | Track[] | SavedTrack[] | SimplifiedTrack[]
    header: boolean
    sticky?: boolean
    album?: boolean
    added?: boolean
    shallow?: boolean
}

const TrackList: React.FC<TrackListProps> = ({ title, tracks, header, sticky, album, added, shallow }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const containerRef = useRef(null)
    useClickOutside(containerRef, () => setSelectedIndex(null))

    // TODO: infinite scrolling/pagination w/ API
    // Only render components in view, or cap total no. of rendered components for performance

    const handleSelect = (index: number) => {
        if (selectedIndex === index) {
            // TODO: playSong
            return setSelectedIndex(null)
        }
        setSelectedIndex(index)
    }

    return (
        <>
            {title && (
                <div className="mb-4 mt-2 select-none">
                    <span className="text-2xl font-bold">{title}</span>
                </div>
            )}
            <TrackListHeader
                display={header}
                sticky={sticky}
                album={album}
                added={added}
            />

            <div
                ref={containerRef}
                className="mb-4 rounded-md border border-transparent"
            >
                {shallow
                    ? tracks.slice(0, 5).map((track, index) => (
                          <TrackListItem
                              key={index}
                              index={index}
                              track={track}
                              album={album}
                              added={added}
                              selected={selectedIndex === index}
                              onSelect={handleSelect}
                          ></TrackListItem>
                      ))
                    : tracks.map((track, index) => (
                          <TrackListItem
                              key={index}
                              index={index}
                              track={track}
                              album={album}
                              added={added}
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
    album?: boolean
    added?: boolean
}

const TrackListHeader: React.FC<TrackListHeader> = ({ display, sticky, album, added }) => {
    const { opacity } = useScrollOpacity()

    return display ? (
        <div
            data-display-album={album}
            data-display-added={added}
            className={twMerge(
                `
                    mb-2
                    hidden
                    h-[35px]
                    select-none
                    items-center
                    gap-x-4
                    border-b
                    border-neutral-400/50
                    px-4
                    text-sm
                    font-normal
                    text-neutral-400
                    md:grid
                    md:grid-cols-[16px_minmax(120px,6fr)_120px]
                    md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,5fr)_120px]
                    xl:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_120px]
                `,
                sticky && 'sticky top-[64px]',
                opacity === 1 && 'mx-[-16px] px-8'
            )}
        >
            <BackgroundColour
                defaultClr={true}
                gradient={true}
            />
            <span className="justify-self-end text-base">#</span>
            <span>Title</span>
            {album && <span className="hidden md:block">Album</span>}
            {added && <span className="hidden xl:block">Date added</span>}
            <FaRegClock
                size={16}
                className="ml-5 justify-self-center"
            />
        </div>
    ) : null
}
