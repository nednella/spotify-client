import React, { useRef } from 'react'

import { PlaylistSimplified } from '../../types/Playlist'
import { Track } from '../../types/Track'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import { convertAlbumDuration } from '../../common/convertAlbumDuration'

import Header from '../Header'
import ContentWrapper from './ContentScrollWrapper'
import HeaderSpacer from '../HeaderSpacer'
import BackgroundGradient from '../BackgroundGradient'

interface PlaylistWrapperProps {
    playlist: PlaylistSimplified
    tracks: Track[]
    colour?: string
    children: React.ReactNode
}

const PlaylistWrapper: React.FC<PlaylistWrapperProps> = ({ playlist, tracks, colour, children }) => {
    const { opacity } = useScrollOpacity()
    const contentRef = useRef(null)

    const followers = playlist.followers.total.toLocaleString('en', { notation: 'standard' }) // Thousands separator
    const songs = tracks.length.toLocaleString('en', { notation: 'standard' }) // Thousands separator

    const totalListeningLength = convertAlbumDuration(
        tracks.reduce((n, { duration_ms }) => n + duration_ms, 0).toString()
    )

    return (
        <>
            <Header
                opacity={opacity}
                colour={colour}
            />
            <ContentWrapper contentRef={contentRef}>
                {/* Heading container */}
                <div
                    className="h-fit w-[full] pb-4 md:h-[300px]"
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
                            <p className="hidden md:block">Playlist</p>
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
                                {/* TODO: Change to <Link> if implementing /user/ page */}
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
                                <span className="mx-1">&bull;</span>
                                <span>{followers} Followers</span>
                                <span className="mx-1">&bull;</span>
                                <span>
                                    {songs} songs, {totalListeningLength}
                                </span>
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
            </ContentWrapper>
        </>
    )
}

export default PlaylistWrapper
