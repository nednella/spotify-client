import React, { useRef } from 'react'

import CollectionHeader from './CollectionHeader'
import PlayButton from '../../../../components/PlayButton'
import Header from '../../../../components/Header'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import BackgroundGradient from '../../../../components/BackgroundGradient'

interface CollectionWrapperProps {
    count: number
    duration: number
    children: React.ReactNode
}

const CollectionWrapper: React.FC<CollectionWrapperProps> = ({ count, duration, children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header>
                <PlayButton
                    contentId={'spotify:collection:tracks'}
                    size={24}
                    className="absolute"
                />
                <span className="truncate pl-14 text-2xl font-bold">Liked Songs</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <CollectionHeader
                    count={count}
                    duration={duration}
                />
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        className="z-[-1]"
                        size="large"
                    />
                    {/* Content container */}
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

export default CollectionWrapper
