import React, { useRef } from 'react'

import { Album } from '../../../../types/Album'

import AlbumHeader from './AlbumHeader'
import Header from '../../../../components/Header'
import PlayButton from '../../../../components/PlayButton'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import BackgroundGradient from '../../../../components/BackgroundGradient'

interface AlbumWrapperProps {
    album: Album
    colour?: string
    children: React.ReactNode
}

const AlbumWrapper: React.FC<AlbumWrapperProps> = ({ album, colour, children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header colour={colour}>
                <PlayButton
                    contentId={album.id}
                    size={24}
                    className="absolute"
                />
                <span className="truncate pl-14 text-2xl font-bold">{album.name}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <AlbumHeader
                    album={album}
                    colour={colour}
                />
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        size="large"
                        colour={colour}
                        className="z-[-1]"
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
