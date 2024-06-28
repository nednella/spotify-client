import React from 'react'
import { Link } from 'react-router-dom'

import { Album } from '../../../../types/Album'
import { toTitleCase } from '../../../../common/toTitleCase'
import { convertAlbumDuration } from '../../../../common/convertAlbumDuration'
import HeaderSpacer from '../../../../components/HeaderSpacer'

interface AlbumHeaderProps {
    album: Album
    colour?: string
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ album, colour }) => {
    const totalListeningLength = convertAlbumDuration(
        album.tracks.items.reduce((n, { duration_ms }) => n + duration_ms, 0).toString()
    )

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
                        src={album.images && album.images[0] ? album.images[0].url : '../src/assets/images/liked.png'}
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
                    <p className="hidden md:block">{toTitleCase(album.album_type)}</p>
                    <p
                        className="
                            text-3xl
                            font-bold
                            md:text-5xl
                            md:font-extrabold
                        "
                    >
                        {album.name}
                    </p>
                    <div
                        className="
                            flex
                            flex-col
                            gap-x-2
                            gap-y-2
                            text-sm
                            font-normal
                            md:flex-row
                        "
                    >
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
                            <div className="flex flex-wrap">
                                {album.artists.map((artist, index) => (
                                    <React.Fragment key={index}>
                                        <Link
                                            to={`/${artist.type}/${artist.id}`}
                                            className="font-bold hover:underline"
                                        >
                                            {artist.name}
                                        </Link>
                                        {index < album.artists.length - 1 && <span className="mx-1">&bull;</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <span className="mx-1 hidden md:block">&bull;</span>
                            <span>{album.release_date.substring(0, 4)}</span>
                            <span className="mx-1 hidden md:block">&bull;</span>
                            <span>
                                {album.total_tracks} songs, {totalListeningLength}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AlbumHeader
