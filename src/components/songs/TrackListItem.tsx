import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { RiPlayLargeFill } from 'react-icons/ri'

import { Track } from '../../types/Track'
import { convertTrackDuration } from '../../utils/convertTrackDuration'
import Tooltip from '../Tooltip'
import LibraryButton from '../LibraryButton'

interface TrackListItem {
    index: number
    song: Track
    album: boolean
    selected: boolean
    onSelect: (value: number) => void
}

const TrackListItem: React.FC<TrackListItem> = ({ index, song, album, selected, onSelect }) => {
    const duration = convertTrackDuration(song.duration_ms)

    const onPlayClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        // TODO: Tooltip onClick --> Play Song
        // TODO: SOCKET OnPlay --> Track # & Track title --> text-green-500
    }

    // TODO: LibraryButton onClick

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
                grid-cols-[16px_minmax(120px,6fr)_80px]
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
                md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,5fr)_80px]
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
                    className="
                            hidden 
                            text-white
                            group-hover:block
                            group-data-[selected=true]:block
                        "
                >
                    <RiPlayLargeFill onClick={(e) => onPlayClick(e)} />
                </Tooltip>
                <p
                    className="
                        pr-1
                        group-hover:hidden
                        group-data-[selected=true]:hidden
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
                                    to={`/artist/${artist.id}`}
                                    className="
                                            hover:text-white
                                            hover:underline
                                            group-hover:text-white
                                            group-data-[selected=true]:text-white
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
                    data-column={3}
                    className="
                        overflow-hidden
                        truncate
                        group-hover:text-white
                        group-data-[selected=true]:text-white
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
                data-column={4}
                className="
                    flex
                    justify-between
                    overflow-hidden
                    truncate
                "
            >
                <LibraryButton
                    inLibrary={false}
                    size={0}
                    className="
                        hidden
                        group-hover:block
                        group-data-[selected=true]:block
                    "
                />
                <p className="justify-self-end">{duration}</p>
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
