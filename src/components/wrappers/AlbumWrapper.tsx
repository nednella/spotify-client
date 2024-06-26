import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { Album } from '../../types/Album'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import { convertAlbumDuration } from '../../common/convertAlbumDuration'
import { toTitleCase } from '../../common/toTitleCase'

import Header from '../Header'
import PlayButton from '../PlayButton'
import ScrollWrapper from './ScrollWrapper'
import HeaderSpacer from '../HeaderSpacer'
import BackgroundGradient from '../BackgroundGradient'

interface AlbumWrapperProps {
    album: Album
    colour?: string
    children: React.ReactNode
}

const AlbumWrapper: React.FC<AlbumWrapperProps> = ({ album, colour, children }) => {
    const { opacity } = useScrollOpacity()
    const contentRef = useRef(null)

    const totalListeningLength = convertAlbumDuration(
        album.tracks.items.reduce((n, { duration_ms }) => n + duration_ms, 0).toString()
    )

    console.log(album)

    return (
        <>
            <Header
                opacity={opacity}
                colour={colour}
            >
                <PlayButton
                    contentId={album.id}
                    size={24}
                    className="absolute"
                />
                <span className="truncate pl-14 text-2xl font-bold">{album.name}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                {/* Heading container */}
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
                                    album.images && album.images[0]
                                        ? album.images[0].url
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
                                                {index < album.artists.length - 1 && (
                                                    <span className="mx-1">&bull;</span>
                                                )}
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
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        colour={colour}
                        className="z-[-1]"
                        size="large"
                    />
                    {/* Content */}
                    <section
                        ref={contentRef}
                        className="mx-auto h-fit w-full max-w-[1400px] p-4"
                    >
                        {children}
                    </section>
                </div>
            </ScrollWrapper>
        </>
    )
}

export default AlbumWrapper
