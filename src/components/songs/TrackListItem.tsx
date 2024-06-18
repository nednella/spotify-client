import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { Track } from '../../types/Track'
import { convertTrackDuration } from '../../utils/convertTrackDuration'

interface TrackListItem {
    index: number
    song: Track
    album: boolean
    selected: boolean
    onSelect: (value: number) => void
}

const TrackListItem: React.FC<TrackListItem> = ({ index, song, album, selected, onSelect }) => {
    // TODO: render play button instead of track index when selected
    // TODO: render add to library button between album and duration when selected

    const duration = convertTrackDuration(song.duration_ms)

    return (
        <div
            data-display-album={album}
            data-index={index}
            data-selected={selected}
            onClick={() => onSelect(index)}
            className="
                grid
                h-14
                select-none
                grid-cols-[16px_minmax(120px,6fr)_40px]
                items-center
                gap-x-4
                rounded-md
                px-4
                text-sm
                font-normal
                text-neutral-400
                hover:bg-neutral-700/50
                data-[selected=true]:bg-neutral-500/50
                data-[selected=true]:hover:bg-neutral-500/50
                md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_40px]
             "
        >
            {/* Track index */}
            <ItemContainer
                selected={selected}
                column={1}
                className="text-center text-base"
            >
                {index + 1}
            </ItemContainer>

            {/* Track details */}
            <ItemContainer
                selected={selected}
                column={2}
                className="flex items-center"
            >
                {/* Image container */}
                <div
                    className="
                        mr-3
                        max-h-10
                        max-w-10
                    "
                >
                    <img
                        className="rounded-sm object-cover"
                        src={
                            song.album && song.album.images[0]
                                ? song.album.images[0].url
                                : '../src/assets/images/placeholder.png'
                        }
                        alt="Album artwork"
                    />
                </div>
                {/* Details container */}
                <div className="flex flex-col overflow-hidden">
                    {/* Track title */}
                    <span className="truncate text-base text-white">{song.name}</span>
                    {/* Track artists */}
                    <div className="overflow-hidden truncate">
                        {song.artists.map((artist, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    to={`/artist/${artist.id}`}
                                    className="
                                            hover:text-white
                                            hover:underline
                                        "
                                >
                                    {artist.name}
                                </Link>
                                {index < song.artists.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </ItemContainer>

            {/* Track album */}
            {album && (
                <ItemContainer
                    selected={selected}
                    column={3}
                    className="
                        data-[selected=true]:text-white
                    "
                >
                    <Link
                        to={`/album/${song.album.id}`}
                        className="
                            hover:text-white
                            hover:underline
                        "
                    >
                        {song.album.name}
                    </Link>
                </ItemContainer>
            )}

            {/* Track duration */}
            <ItemContainer
                selected={selected}
                column={4}
                className="text-center"
            >
                {duration}
            </ItemContainer>
        </div>
    )
}

interface ItemContainerProps {
    selected: boolean
    column: number
    children: React.ReactNode
    className: string
}

const ItemContainer: React.FC<ItemContainerProps> = ({ selected, column, children, className }) => {
    return (
        <div
            data-selected={selected}
            data-column={column}
            className={twMerge(
                `
                    overflow-hidden
                    truncate
                    data-[column="3"]:hidden
                    md:data-[column="3"]:block
                `,
                className
            )}
        >
            {children}
        </div>
    )
}

export default TrackListItem
