import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useScroll, useTransform } from 'framer-motion'

import { useAuth } from '../../hooks/useAuth'

import Header from '../../components/Header'
import ScrollArea from '../../components/ScrollArea'
import BackgroundColour from '../../components/BackgroundColour'
import BackgroundGradient from '../../components/BackgroundGradient'
import HeaderSpacer from '../../components/HeaderSpacer'
import RecentCard from '../../components/homepage/RecentCard'
import RecentCardLoading from '../../components/homepage/RecentCardLoading'
import ContentSection from '../../components/homepage/ContentSection'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Home = () => {
    const { user } = useAuth()
    const [colour, setColour] = useState('23, 23, 23') // accepts r/g/b format
    const [opacity, setOpacity] = useState('0') // accepts values ranging from 0 to 1

    // TODO: pull headerColour from random list, or from item, idk

    // Header opacity update on scroll
    const ref = useRef(null)
    const scrollAreaRef = useRef(null)

    const { scrollY } = useScroll({
        target: ref,
        container: scrollAreaRef,
        offset: ['start end', 'end end'],
    })

    const updatedOpacity = useTransform(scrollY, [8, 64], [0, 1]) // Array 1: accepts px values from -> to
    updatedOpacity.on('change', (value) => setOpacity(value.toString()))

    useEffect(() => {
        setColour('6, 95, 70')
        // setColour('150, 23, 23')
        setColour('240, 144, 184')
    }, [])

    return (
        <>
            <Header
                className={twMerge('', !user && `bg-transparent`)}
                colour={colour}
                opacity={opacity}
            ></Header>
            <ScrollArea
                ref={scrollAreaRef}
                className="h-full w-full"
            >
                {user ? (
                    <>
                        {/* Content container */}
                        <div className="relative h-fit w-full">
                            <BackgroundGradient
                                colour={colour}
                                size="large"
                            />
                            <HeaderSpacer />

                            {/* Content */}
                            <section
                                ref={ref}
                                className="absolute z-[1] h-fit w-full"
                            >
                                {/* Sticky controls */}
                                <h3 className="sticky top-[64px] z-20 h-[56px] w-full">
                                    <BackgroundColour
                                        colour={colour}
                                        opacity={opacity}
                                    />
                                    <p className="px-4">[Additional Nav Buttons]</p>
                                </h3>

                                {/* Recently played */}
                                <section className="px-4 pb-4 pt-2">
                                    <section
                                        className="
                                mb-4
                                grid
                                grid-cols-1
                                gap-2
                                xsm:grid-cols-2
                                xl:grid-cols-4
                            "
                                    >
                                        <RecentCard
                                            image={'/src/assets/images/mac.png'}
                                            title={'Liked Songs'}
                                            href={''}
                                        />
                                        <RecentCard
                                            image=""
                                            title={'Recent Playlist B'}
                                            href={''}
                                        />
                                        <RecentCard
                                            image={'/src/assets/images/liked.png'}
                                            title={'Recent Playlist C'}
                                            href={''}
                                        />
                                        <RecentCard
                                            image={'/src/assets/images/liked.png'}
                                            title={'Recent Playlist D'}
                                            href={''}
                                        />
                                        <RecentCard
                                            image={'/src/assets/images/liked.png'}
                                            title={'Recent Playlist E'}
                                            href={''}
                                        />
                                        <RecentCard
                                            image={'/src/assets/images/liked.png'}
                                            title={'Recent Playlist F'}
                                            href={''}
                                        />
                                        <RecentCardLoading />
                                        <RecentCardLoading />
                                    </section>
                                    <ContentSection title={'Content Title'} />
                                    <ContentSectionLoading />
                                    <ContentSectionLoading />
                                    <ContentSectionLoading />
                                </section>
                            </section>
                        </div>
                    </>
                ) : null}
                {/* TODO: add "logged out" content */}
            </ScrollArea>
        </>
    )
}

export default Home
