import React, { useRef } from 'react'

// import { Album } from '../../types/Album'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import Header from '../Header'
import ContentWrapper from './ContentScrollWrapper'
import HeaderSpacer from '../HeaderSpacer'
import BackgroundGradient from '../BackgroundGradient'

interface AlbumWrapperProps {
    // album: Album
    colour?: string
    children: React.ReactNode
}

const AlbumWrapper: React.FC<AlbumWrapperProps> = ({ colour, children }) => {
    const { opacity } = useScrollOpacity()
    const contentRef = useRef(null)

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
                                // src={
                                //     album.images && album.images[0]
                                //         ? album.images[0].url
                                //         : '../src/assets/images/liked.png'
                                // }
                                src={'../src/assets/images/liked.png'}
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
                            <p className="hidden md:block">Album</p>
                            <p
                                className="
                                text-3xl
                                font-bold
                                md:text-5xl
                                md:font-extrabold
                            "
                            >
                                Album Name
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
                                    gap-x-2
                                    text-sm
                                    font-normal
                                "
                                >
                                    <p>Album author</p>
                                    <p>Release year</p>
                                    <p>Song count</p>
                                    <p>Approx. listening length</p>
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
            </ContentWrapper>
        </>
    )
}

export default AlbumWrapper
