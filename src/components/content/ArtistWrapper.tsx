import React, { useRef } from 'react'

import TemplateWrapper from './TemplateWrapper'
import BackgroundGradient from '../BackgroundGradient'
import { Artist } from '../../types/Artist'

interface ArtistWrapperProps {
    artist: Artist
    colour?: string
    children: React.ReactNode
}

const ArtistWrapper: React.FC<ArtistWrapperProps> = ({ artist, colour, children }) => {
    const contentRef = useRef(null)
    const followers = artist.followers.total.toLocaleString('en', { notation: 'standard' }) // Thousands separator

    return (
        <TemplateWrapper
            contentRef={contentRef}
            colour={colour}
        >
            {/* Heading container */}
            <div
                className="h-[300px] w-[full] pb-4"
                style={{
                    backgroundColor: `rgb(${colour})`,
                    backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
                }}
            >
                {/* Heading content */}
                <section className="mx-auto flex h-full w-full max-w-[1400px] items-end px-4">
                    <div className="mr-4 w-fit">
                        <div className="flex size-40 items-center justify-center">
                            <img
                                className="h-40 w-40 rounded-md object-cover"
                                src={
                                    artist.images && artist.images[0]
                                        ? artist.images[0].url
                                        : '../src/assets/images/liked.png'
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full overflow-hidden">
                        <p>Artist</p>
                        <p className="text-7xl font-extrabold">{artist.name}</p>
                        <p className="mt-4 text-sm font-normal">{followers} Followers</p>
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
        </TemplateWrapper>
    )
}

export default ArtistWrapper
