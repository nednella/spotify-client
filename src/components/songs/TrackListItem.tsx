import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { RiPlayLargeFill } from 'react-icons/ri'

import { Track } from '../../types/Track'
import { convertTrackDuration } from '../../utils/convertTrackDuration'
import Tooltip from '../Tooltip'

interface TrackListItem {
    index: number
    song: Track
    album: boolean
    selected: boolean
    onSelect: (value: number) => void
}

const TrackListItem: React.FC<TrackListItem> = ({ index, song, album, selected, onSelect }) => {
    // TODO: Tooltip onClick --> Play Song
    // TODO: SOCKET OnPlay --> Track # & Track title --> text-green-500
    // TODO: Render add to library button between album and duration when selected

    const duration = convertTrackDuration(song.duration_ms)

    return (
        <div
            data-display-album={album}
            data-index={index}
            data-selected={selected}
            onClick={() => onSelect(index)}
            className="
                group
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
                data-selected={selected}
                data-column={1}
                className="
                    text-right
                    text-base
                "
                style={{ direction: 'rtl' }}
            >
                <Tooltip
                    message={`Play ${song.name} by ${song.artists[0].name}`}
                    data-selected={selected}
                    className="
                            hidden 
                            text-white
                            group-hover:block
                            data-[selected=true]:block
                        "
                >
                    <RiPlayLargeFill />
                </Tooltip>
                <p
                    data-selected={selected}
                    className="
                        pr-1
                        group-hover:hidden
                        data-[selected=true]:hidden
                    "
                >
                    {index + 1}
                </p>
            </ItemContainer>

            {/* Track details */}
            <ItemContainer
                data-selected={selected}
                data-column={2}
                className="
                    flex
                    items-center
                    overflow-hidden
                    truncate
                "
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
                                    data-selected={selected}
                                    to={`/artist/${artist.id}`}
                                    className="
                                            hover:text-white
                                            hover:underline
                                            group-hover:text-white
                                            data-[selected=true]:text-white
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
                    data-selected={selected}
                    data-column={3}
                    className="
                        overflow-hidden
                        truncate
                        group-hover:text-white
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
                data-selected={selected}
                data-column={4}
                className="
                    overflow-hidden
                    truncate
                    text-center
                "
            >
                {duration}
            </ItemContainer>
        </div>
    )
}

interface ItemContainerProps {
    children: React.ReactNode
    className?: string
    style?: CSSProperties
}

const ItemContainer: React.FC<ItemContainerProps> = ({ children, className, style, ...props }) => {
    return (
        <div
            className={twMerge(
                `
                    data-[column="3"]:hidden
                    md:data-[column="3"]:block
                `,
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </div>
    )
}

export default TrackListItem
