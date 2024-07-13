import React from 'react'

import useColour from '../../../../hooks/useColour'

import { SimplifiedPlaylist } from '../../../../types/Playlist'

import { convertAlbumDuration } from '../../../../common/convertAlbumDuration'
import { toTitleCase } from '../../../../common/toTitleCase'

import HeaderSpacer from '../../../../components/HeaderSpacer'

interface PlaylistHeaderProps {
    playlist: SimplifiedPlaylist
    count: number
    duration: number
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist, count, duration }) => {
    const { colour } = useColour()

    const followers = playlist.followers.total.toLocaleString('en', { notation: 'standard' }) // Thousands separator
    const songs = count.toLocaleString('en', { notation: 'standard' }) // Thousands separator
    const totalListeningLength = convertAlbumDuration(duration)

    return (
        <div
            className="h-fit w-[full] pb-4 md:h-[280px]"
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
            }}
        >
            <HeaderSpacer className="md:hidden" />
            {/* Heading content */}
            <section
                className="
                            mx-auto
                            flex
                            h-full
                            max-w-[1400px]
                            select-none
                            flex-col
                            px-4
                            md:flex-row
                        "
            >
                {/* Image container */}
                <div
                    className="
                                mb-4
                                max-h-[288px]
                                min-h-[128px]
                                w-[40vw]
                                min-w-[128px]
                                max-w-[288px]
                                self-center
                                md:mb-0
                                md:mr-4
                                md:max-h-[128px]
                                md:max-w-[128px]
                                md:self-end
                            "
                >
                    {/* Image */}
                    <img
                        className="
                                    aspect-square
                                    rounded-md
                                    object-cover
                                "
                        src={
                            playlist.images && playlist.images[0]
                                ? playlist.images[0].url
                                : '../src/assets/images/liked.png'
                        }
                    />
                </div>
                {/* Details container */}
                <div
                    className="
                                flex
                                flex-col
                                gap-y-2
                                overflow-hidden
                                md:self-end
                            "
                >
                    {/* Details */}
                    <p className="hidden md:block">{toTitleCase(playlist.type)}</p>
                    <p
                        className="
                                    text-3xl
                                    font-bold
                                    md:text-5xl
                                    md:font-extrabold
                                "
                    >
                        {playlist.name}
                    </p>
                    <p
                        className="
                                    text-sm
                                    font-medium
                                    text-neutral-400
                                "
                    >
                        {playlist.description}
                    </p>
                    <div
                        className="
                                    flex
                                    flex-col
                                    flex-wrap
                                    text-sm
                                    font-normal
                                    md:flex-row
                            "
                    >
                        <span>
                            By{' '}
                            <a
                                href={playlist.owner.external_urls.spotify}
                                target="_blank"
                                className="font-bold hover:underline"
                            >
                                {playlist.owner.display_name}
                            </a>
                        </span>
                        <span className="mx-1 hidden md:block">&bull;</span>
                        <span>{followers} saves</span>
                        <span className="mx-1 hidden md:block">&bull;</span>
                        <span>
                            {songs} {songs === '1' ? 'song' : 'songs'}, {totalListeningLength}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PlaylistHeader
