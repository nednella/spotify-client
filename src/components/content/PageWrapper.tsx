import React, { useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { useAuth } from '../../hooks/useAuth'

import Header from '../Header'
import ScrollArea from '../ScrollArea'
import BackgroundColour from '../BackgroundColour'
import BackgroundGradient from '../BackgroundGradient'
import HeaderSpacer from '../HeaderSpacer'

interface ContentWrapperProps {
    contentType: 'homepage' | 'playlist' | 'album' | 'artist' | 'profile'
    children: React.ReactNode
    colour?: string
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ contentType, children, colour }) => {
    const { user } = useAuth()
    const [opacity, setOpacity] = useState('0')

    // TODO: pull headerColour from random list, or from item, idk

    // Scroll header opacity functionality
    const contentRef = useRef(null)
    const scrollAreaRef = useRef(null)

    const { scrollY } = useScroll({
        target: contentRef,
        container: scrollAreaRef,
        offset: ['start end', 'end end'],
    })

    let scrollOffset
    if (contentType === 'homepage') scrollOffset = 8
    else scrollOffset = 186

    const scrollStartOffset = scrollOffset
    const scrollEndOffset = scrollStartOffset + 64

    const updatedOpacity = useTransform(scrollY, [scrollStartOffset, scrollEndOffset], [0, 1])
    updatedOpacity.on('change', (value) => setOpacity(value.toString()))

    // NOTE: there are two different wrapper types for a couple reasons.
    // 1. Homepage needs authentication before rendering due to not using a /login screen
    // 2. Homepage has a slightly different layout w.r.t. background gradient and content positioning

    // Homepage wrapper
    if (contentType === 'homepage') {
        return (
            <>
                <Header
                    className={twMerge('', !user && `bg-transparent`)}
                    colour={colour}
                    opacity={opacity}
                ></Header>
                <ScrollArea
                    ref={scrollAreaRef}
                    className="relative h-full w-full"
                >
                    {user ? (
                        <>
                            {/* Background gradient */}
                            <BackgroundGradient
                                colour={colour}
                                size="large"
                            />

                            {/* Header spacer */}
                            <HeaderSpacer />

                            {/* Sticky controls */}
                            <h3 className="sticky top-[64px] z-20 h-[56px] w-full">
                                <BackgroundColour
                                    colour={colour}
                                    opacity={opacity}
                                />
                                <p className="px-4">[Additional Nav Buttons]</p>
                            </h3>

                            {/* Content container */}
                            <div className="relative z-[1] h-fit w-full">
                                {/* Content */}
                                <section
                                    ref={contentRef}
                                    className="mx-auto h-fit w-full max-w-[1400px] p-4"
                                >
                                    {children}
                                </section>
                            </div>
                        </>
                    ) : null}
                    {/* TODO: add "logged out" content */}
                </ScrollArea>
            </>
        )
    }

    // Content wrapper
    return (
        <>
            <Header
                colour={colour}
                opacity={opacity}
            />
            <ScrollArea
                ref={scrollAreaRef}
                className="relative h-full w-full"
            >
                {/* Heading container */}
                <div
                    className="h-[250px] w-[full] pb-4"
                    style={{
                        backgroundColor: `rgb(${colour})`,
                        backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
                    }}
                >
                    {/* Heading content */}
                    <section className="mx-auto h-full w-full max-w-[1400px]">
                        Heading component
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
            </ScrollArea>
        </>
    )
}

export default ContentWrapper
