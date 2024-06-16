import { useEffect, useState } from 'react'

import HomeWrapper from '../../components/wrappers/HomeWrapper'

import RecentCard from '../../components/homepage/RecentCard'
import RecentCardLoading from '../../components/homepage/RecentCardLoading'
import ContentSection from '../../components/homepage/ContentSection'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Home = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    // TODO: pull headerColour from random list, or from item, idk

    useEffect(() => {
        // setColour('6, 95, 70')
        // setColour('150, 23, 23')
        // setColour('240, 144, 184')
        // setColour('16, 88, 184')
        setColour('29, 185, 84')
    }, [])

    return (
        <>
            <HomeWrapper colour={colour}>
                {/* Recently played */}
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
            </HomeWrapper>
        </>
    )
}

export default Home
