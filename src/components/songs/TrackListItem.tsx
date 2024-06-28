import React, { CSSProperties, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { RiPlayLargeFill } from 'react-icons/ri'
import { VscEllipsis } from 'react-icons/vsc'

import updateLibrary from '../../api/user/UserLibraryUpdate'
import { useLibrary } from '../../hooks/useLibrary'
import { Track } from '../../types/Track'
import { convertTrackDuration } from '../../common/convertTrackDuration'

import Tooltip from '../Tooltip'
import LibraryButton from '../LibraryButton'
import OptionsMenu from '../menus/SongOptionsMenu'

interface TrackListItem {
    index: number
    song: Track
    album: boolean
    selected: boolean
    onSelect: (value: number) => void
}

const TrackListItem: React.FC<TrackListItem> = ({ index, song, album, selected, onSelect }) => {
    const [inLibrary, setInLibrary] = useState(false)
    const queryClient = useQueryClient()
    const { data: library } = useLibrary()

    const updateUserLibrary = useMutation({
        mutationFn: async () => updateLibrary(inLibrary, song.type, song.id),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['library'], type: 'active' })
            if (inLibrary) {
                setInLibrary(false)
                toast.success('Removed from Your Library')
            } else {
                setInLibrary(true)
                toast.success('Added to Your Library')
            }
        },
        onError: () => {
            toast.error('Something went wrong')
        },
    })

    const debounceUpdateUserLibrary = debounce(() => updateUserLibrary.mutate(), 100)

    const duration = convertTrackDuration(song.duration_ms)

    const onPlayClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        // TODO: Tooltip onClick --> Play Song
        // TODO: SOCKET OnPlay --> Track # & Track title --> text-green-500
    }

    useEffect(() => {
        // Check if the song exists in the authenticated user's library.
        if (library.tracks.some((item) => item.id === song.id)) {
            setInLibrary(true)
        } else setInLibrary(false)
    }, [library, song])

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
                <Tooltip message={`Play ${song.name} by ${song.artists[0].name}`}>
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
                {song.album && (
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
                                song.album.images[0] ? song.album.images[0].url : '../src/assets/images/placeholder.png'
                            }
                            alt="Album artwork"
                        />
                    </div>
                )}
                {/* Details container */}
                <div className="flex flex-col overflow-hidden">
                    {/* Track title */}
                    <span className="truncate text-base text-white">{song.name}</span>
                    {/* Track artists */}
                    <div className="overflow-hidden truncate">
                        {song.artists.map((artist, index) => (
                            <React.Fragment key={index}>
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

            {/* Track duration and buttons */}
            <ItemContainer
                data-column={4}
                className="
                    flex
                    items-center
                    justify-end
                    overflow-hidden
                    truncate
                "
            >
                <LibraryButton
                    inLibrary={inLibrary}
                    onClick={debounceUpdateUserLibrary}
                    size={14}
                    className={twMerge(
                        `
                        hidden
                        justify-self-start
                        shadow-none
                        group-hover:block
                        group-data-[selected=true]:block
                    `,
                        inLibrary && 'block'
                    )}
                />
                <span
                    className="
                        ml-4
                        w-[5ch]
                        text-right
                    "
                >
                    {duration}
                </span>
                <OptionsMenu
                    userOwned={false}
                    url={song.external_urls.spotify}
                    uri={song.uri}
                >
                    <button className="ml-4">
                        <Tooltip message={`More options for ${song.name} by ${song.artists[0].name}`}>
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
