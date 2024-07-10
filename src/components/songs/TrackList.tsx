import React, { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaRegClock } from 'react-icons/fa'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import { PlaylistTrack, SavedTrack, SimplifiedTrack, Track } from '../../types/Track'

import BackgroundColour from '../BackgroundColour'
import TrackListItem from './TrackListItem'
import { useClickOutside } from '../../hooks/useClickOutside'

interface TrackListProps {
    tracks: PlaylistTrack[] | Track[] | SavedTrack[] | SimplifiedTrack[]
    header: boolean
    sticky?: boolean
    displayAlbum?: boolean
    displayAdded?: boolean
    shallowList?: boolean
}

const TrackList: React.FC<TrackListProps> = ({ tracks, header, sticky, displayAlbum, displayAdded, shallowList }) => {
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
            <TrackListHeader
                header={header}
                sticky={sticky}
                displayAlbum={displayAlbum}
                displayAdded={displayAdded}
            />

            <div
                ref={containerRef}
                className="mb-4 rounded-md border border-transparent"
            >
                {shallowList
                    ? tracks.slice(0, 5).map((track, index) => (
                          <TrackListItem
                              key={index}
                              index={index}
                              track={track}
                              album={displayAlbum}
                              added={displayAdded}
                              selected={selectedIndex === index}
                              onSelect={handleSelect}
                          ></TrackListItem>
                      ))
                    : tracks.map((track, index) => (
                          <TrackListItem
                              key={index}
                              index={index}
                              track={track}
                              album={displayAlbum}
                              added={displayAdded}
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
    header: boolean
    sticky?: boolean
    displayAlbum?: boolean
    displayAdded?: boolean
}

const TrackListHeader: React.FC<TrackListHeader> = ({ header, sticky, displayAlbum, displayAdded }) => {
    const { opacity } = useScrollOpacity()

    return header ? (
        <div
            data-display-album={displayAlbum}
            data-display-added={displayAdded}
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
            {displayAlbum && <span className="hidden md:block">Album</span>}
            {displayAdded && <span className="hidden xl:block">Date added</span>}
            <FaRegClock
                size={16}
                className="ml-5 justify-self-center"
            />
        </div>
    ) : null
}
