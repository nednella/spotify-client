import React, { useRef } from 'react'

import GenreHeader from './GenreHeader'
import Header from '../../../../components/Header'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import BackgroundGradient from '../../../../components/BackgroundGradient'

interface GenreWrapperProps {
    genre: string
    children: React.ReactNode
}

const GenreWrapper: React.FC<GenreWrapperProps> = ({ genre, children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header>
                <span className="truncate text-2xl font-bold">{genre}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <GenreHeader genre={genre} />
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
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

export default GenreWrapper
