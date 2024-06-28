import React, { useRef } from 'react'

import { Artist } from '../../../../types/Artist'

import ArtistHeader from './ArtistHeader'
import Header from '../../../../components/Header'
import PlayButton from '../../../../components/PlayButton'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import BackgroundGradient from '../../../../components/BackgroundGradient'

interface ArtistWrapperProps {
    artist: Artist
    children: React.ReactNode
}

const ArtistWrapper: React.FC<ArtistWrapperProps> = ({ artist, children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header>
                <PlayButton
                    contentId={artist.id}
                    size={24}
                    className="absolute"
                />
                <span className="truncate pl-14 text-2xl font-bold">{artist.name}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <ArtistHeader artist={artist} />
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        className="z-[-1]"
                        size="large"
                    />
                    {/* Content */}
                    <section
                        ref={contentRef}
                        className="h-fit w-full"
                    >
                        {children}
                    </section>
                </div>
            </ScrollWrapper>
        </>
    )
}

export default ArtistWrapper
