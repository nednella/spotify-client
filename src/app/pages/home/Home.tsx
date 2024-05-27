import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAuth } from '../../../hooks/useAuth'

import Header from '../../../components/Header'
import RecentCard from './components/RecentCard'
import RecentCardLoading from './components/RecentCardLoading'
import ContentSection from './components/ContentSection'
import ContentSectionLoading from './components/ContentSectionLoading'

const Home = () => {
    const { user } = useAuth()
    const [colour, setColour] = useState('23, 23, 23') // accepts r/g/b format
    const [gradient, setGradient] = useState(true)
    const [headerOpacity, setHeaderOpacity] = useState('0') // accepts values ranging from 0 to 1

    // TODO: pull headerColour from random list, or from item, idk

    // TODO: onScroll, setHeaderOpacity('100') & setGradient(false)
    const scroll = false

    useEffect(() => {
        if (user) {
            setColour('150, 23, 23')

            if (scroll) {
                setHeaderOpacity('1')
                setGradient(false)
            }
        }
    }, [user, scroll])

    return (
        <>
            {/* Page header */}
            <Header
                className={twMerge('z-10', !user && `bg-transparent`)}
                style={{
                    backgroundColor: `rgba(${colour}, ${headerOpacity})`,
                    transition: 'background-color 1000ms ease-out',
                }}
            >
                {/* TODO: header nav buttons */}
                {user ? <h3>[Additional Nav Buttons]</h3> : null}
            </Header>
            {/* Page content */}
            {user ? (
                <>
                    {/* Background colour */}
                    {gradient ? (
                        <div
                            className={twMerge(
                                'absolute top-0 h-[400px] w-full',
                                !gradient && 'bg-none'
                            )}
                            style={{
                                backgroundImage: `
                                    linear-gradient(to bottom,
                                    rgb(${colour}),
                                    transparent)
                                `,
                            }}
                        ></div>
                    ) : null}

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
