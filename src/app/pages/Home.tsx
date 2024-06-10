import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAuth } from '../../hooks/useAuth'

import Header from '../../components/Header'
import RecentCard from '../../components/homepage/RecentCard'
import RecentCardLoading from '../../components/homepage/RecentCardLoading'
import ContentSection from '../../components/homepage/ContentSection'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'
import ScrollArea from '../../components/ScrollArea'

const Home = () => {
    const { user } = useAuth()
    const [colour, setColour] = useState('23, 23, 23') // accepts r/g/b format
    const [headerOpacity, setHeaderOpacity] = useState('0') // accepts values ranging from 0 to 1

    // TODO: pull headerColour from random list, or from item, idk

    // TODO: onScroll, setHeaderOpacity('100') & setGradient(false)
    const scroll = false

    useEffect(() => {
        setColour('6, 95, 70')
        // setColour('150, 23, 23')

        if (scroll) {
            setHeaderOpacity('1')
        }
    }, [scroll])

    return (
        <>
            <Header
                className={twMerge('', !user && `bg-transparent`)}
                style={{
                    backgroundColor: `rgba(${colour}, ${headerOpacity})`,
                    transition: 'background-color 750ms ease',
                }}
            ></Header>
            <ScrollArea className="h-full w-full">
                {/* Content container */}
                <div className="relative h-fit w-full">
                    {/* background gradient */}
                    <div
                        className="absolute top-0 h-[400px] w-full"
                        style={{
                            backgroundImage: `
                                linear-gradient(to bottom,
                                rgb(${colour}),
                                transparent)
                            `,
                        }}
                    ></div>

                    {/* Header spacer */}
                    <div className="h-[64px] w-full"></div>

                    {/* Content */}
                    <section className="absolute z-[1] h-fit w-full">
                        {/* Sticky controls */}
                        <h3
                            className="sticky top-[64px] z-20 w-full px-4"
                            style={{
                                backgroundColor: `rgba(${colour}, ${headerOpacity})`,
                                transition: 'background-color 750ms ease',
                            }}
                        >
                            [Additional Nav Buttons]
                        </h3>

                        {/* Recently played */}
                        <section className="px-4 pb-4">
                            <section
                                className="
                                    my-4
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
            </ScrollArea>
        </>
    )
}

export default Home

// {user ? (
//     <div className="h-full">
//         {/* Content */}

//     </div>
// ) : null}
