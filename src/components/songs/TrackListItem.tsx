import React, { CSSProperties, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { RiPlayLargeFill } from 'react-icons/ri'
import { VscEllipsis } from 'react-icons/vsc'

import updateLibrary from '../../api/user/UserLibraryUpdate'
import { useLibrary } from '../../hooks/useLibrary'

import { NormalisedTrack } from '../../types/Track'

import { convertTrackDateAdded } from '../../common/convertTrackDateAdded'
import { convertTrackDuration } from '../../common/convertTrackDuration'

import Tooltip from '../Tooltip'
import LibraryButton from '../LibraryButton'
import OptionsMenu from '../menus/SongOptionsMenu'

interface TrackListItem {
    index: number
    track: NormalisedTrack
    album?: boolean
    added?: boolean
    selected: boolean
    onSelect: (value: number) => void
}

const TrackListItem: React.FC<TrackListItem> = ({ index, track, album, added, selected, onSelect }) => {
    const [isInLibrary, setisInLibrary] = useState(false)
    const { data: library } = useLibrary()

    const updateUserLibrary = useMutation({
        mutationFn: async () => updateLibrary(isInLibrary, track.type, track.id),
        onSuccess: () => {
            if (isInLibrary) {
                setisInLibrary(false)
                toast.success('Removed from Your Library')
            } else {
                setisInLibrary(true)
                toast.success('Added to Your Library')
            }
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceUpdateUserLibrary = debounce(() => updateUserLibrary.mutate(), 300)

    const onPlayClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        // TODO: Tooltip onClick --> Play track
        // TODO: SOCKET OnPlay --> Track # & Track title --> text-green-500
    }

    const onLibraryClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        debounceUpdateUserLibrary()
    }

    useEffect(() => {
        // Check if the track exists in the authenticated user's library.
        if (library.tracks.some((item) => item.track.id === track.id)) {
            setisInLibrary(true)
        } else setisInLibrary(false)
    }, [setisInLibrary, library, track])

    return (
        <div
            data-display-album={album}
            data-display-added={added}
            data-index={index}
            data-selected={selected}
            onClick={() => onSelect(index)}
            className="
                group
                grid
                h-14
                select-none
                grid-cols-[16px_minmax(120px,6fr)_120px]
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
                md:data-[display-album=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,5fr)_120px]
                xl:data-[display-added=true]:grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_120px]
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
                <Tooltip message={`Play ${track.name} by ${track.artists[0].name}`}>
                    <button
                        onClick={(e) => onPlayClick(e)}
                        className="
                            hidden 
                            text-white
                            group-hover:block
                            group-data-[selected=true]:block
                        "
                    >
                        <RiPlayLargeFill />
                    </button>
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
                {track.album && (
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
                                track.album.images[0]
                                    ? track.album.images[0].url
                                    : '../src/assets/images/placeholder.png'
                            }
                            alt="Album artwork"
                        />
                    </div>
                )}
                {/* Details container */}
                <div className="flex flex-col overflow-hidden">
                    {/* Track title */}
                    <span className="truncate text-base text-white">{track.name}</span>
                    {/* Track artists */}
                    <div className="overflow-hidden truncate">
                        {track.artists.map((artist, index) => (
                            <React.Fragment key={artist.id}>
                                <Link
                                    to={`/${artist.type}/${artist.id}`}
                                    className="
                                            hover:text-white
                                            hover:underline
                                            group-hover:text-white
                                            group-data-[selected=true]:text-white
                                        "
                                >
                                    {artist.name}
                                </Link>
                                {index < track.artists.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </ItemContainer>

            {/* Track album */}
            {album && track.album && (
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
                        to={`/album/${track.album.id}`}
                        className="
                            hover:text-white
                            hover:underline
                        "
                    >
                        {track.album.name}
                    </Link>
                </ItemContainer>
            )}

            {/* Track date added */}
            {added && track.added_at && (
                <ItemContainer
                    data-column={4}
                    className="
                        overflow-hidden
                        truncate
                    "
                >
                    <span>{convertTrackDateAdded(track.added_at)}</span>
                </ItemContainer>
            )}

            {/* Track duration and buttons */}
            <ItemContainer
                data-column={5}
                className="
                    flex
                    items-center
                    justify-end
                    overflow-hidden
                    truncate
                "
            >
                <LibraryButton
                    onClick={(e) => onLibraryClick(e)}
                    isInLibrary={isInLibrary}
                    size={14}
                    className={twMerge(
                        `
                            hidden
                            justify-self-start
                            shadow-none
                            group-hover:block
                            group-data-[selected=true]:block
                        `,
                        isInLibrary && 'block'
                    )}
                />
                <span
                    className="
                        ml-4
                        w-[5ch]
                        text-right
                    "
                >
                    {convertTrackDuration(track.duration_ms)}
                </span>
                <OptionsMenu
                    userOwned={false}
                    url={track.external_urls.spotify}
                    uri={track.uri}
                >
                    <button className="ml-4">
                        <Tooltip message={`More options for ${track.name} by ${track.artists[0].name}`}>
                            <span>
                                <VscEllipsis
                                    size={20}
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
                    data-[column="4"]:hidden
                    md:data-[column="3"]:block
                    xl:data-[column="4"]:block
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
