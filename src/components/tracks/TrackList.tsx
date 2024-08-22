import React, { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaRegClock } from 'react-icons/fa'

import { useClickOutside } from '../../hooks/useClickOutside'
import useScrollOpacity from '../../hooks/useScrollOpacity'

import { PlaylistTrack, SavedTrack, SimplifiedTrack, Track } from '../../types/Track'

import { normaliseTrackObj } from '../../common/normaliseTrackObject'

import BackgroundColour from '../BackgroundColour'
import TrackListItem from './TrackListItem'
import usePlayer from '../../hooks/usePlayer'

interface TrackListProps {
    tracks: PlaylistTrack[] | Track[] | SavedTrack[] | SimplifiedTrack[]
    header: boolean
    sticky?: boolean
    stickyHeight?: string
    displayAlbum?: boolean
    displayAdded?: boolean
    isUserCreated?: boolean
    className?: string
}

const TrackList: React.FC<TrackListProps> = ({
    tracks,
    header,
    sticky,
    stickyHeight,
    displayAlbum,
    displayAdded,
    isUserCreated,
    className,
}) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const containerRef = useRef(null)
    useClickOutside(containerRef, () => setSelectedIndex(null))
    const player = usePlayer()

    const handleSelect = (index: number, uri: string) => {
        if (selectedIndex === index) {
            player.playTrack(uri)
        }
        setSelectedIndex(index)
    }

    const normalisedTracks = tracks.map(normaliseTrackObj)

    return (
        <>
            <TrackListHeader
                header={header}
                sticky={sticky}
                stickyHeight={stickyHeight}
                displayAlbum={displayAlbum}
                displayAdded={displayAdded}
            />
            <div
                ref={containerRef}
                className={twMerge('mb-4 rounded-md border border-transparent', className)}
            >
                {normalisedTracks.map((track, index) => (
                    <TrackListItem
                        key={track.id}
                        index={index}
                        track={track}
                        album={displayAlbum}
                        added={displayAdded}
                        isUserCreated={isUserCreated}
                        selected={selectedIndex === index}
                        onSelect={() => handleSelect(index, track.uri)}
                    />
                ))}
            </div>
        </>
    )
}

export default TrackList

interface TrackListHeader {
    header: boolean
    sticky?: boolean
    stickyHeight?: string
    displayAlbum?: boolean
    displayAdded?: boolean
}

const TrackListHeader: React.FC<TrackListHeader> = ({ header, sticky, stickyHeight, displayAlbum, displayAdded }) => {
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
                    xl:data-[display-added=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_120px]
                `,
                sticky && 'sticky top-[64px]',
                stickyHeight && `top-[${stickyHeight}px]`,
                opacity === 1 && 'mx-[-16px] px-8'
            )}
        >
            <BackgroundColour defaultClr={true} />
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
