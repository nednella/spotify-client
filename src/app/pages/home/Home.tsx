import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSession } from '../../../hooks/useSession'

import Header from '../../../components/Header'
import RecentCard from './components/RecentCard'
import RecentCardLoading from './components/RecentCardLoading'
import ContentSection from './components/ContentSection'
import ContentSectionLoading from './components/ContentSectionLoading'

const Home = () => {
    const { session } = useSession()
    const [headerColour] = useState('emerald-800')
    const [headerOpacity] = useState('100')
    const [gradient] = useState(true)

    // TODO: pull headerColour from random list, or from item, idk
    // TODO: onScroll, setHeaderOpacity('100') & setGradient(false)

    // SUGGESTION: put top-[headerSize]on bg-gradient and remove gradient on scroll

    return (
        <>
            {/* Page header */}
            <Header
                className={twMerge('z-10', session && ``)}
                bgColour={`bg-${headerColour}`}
                bgOpacity={headerOpacity}
            >
                {/* TODO: header nav buttons */}
                {session ? <h3>[Additional Nav Buttons]</h3> : null}
            </Header>
            {/* Page content */}
            {session ? (
                <>
                    {/* Background colour */}
                    <div
                        className={twMerge(
                            `absolute top-[104px] h-[300px] w-full bg-gradient-to-b from-${headerColour}`,
                            !gradient && 'bg-none'
                        )}
                    ></div>
                    {/* Content */}
                    <section className="absolute top-[104px] w-full p-4">
                        <p className="sticky text-3xl font-semibold text-white">
                            Welcome back, user
                        </p>

                        {/* Recently played */}
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
                    </section>
                </>
            ) : null}
        </>
    )
}

export default Home
