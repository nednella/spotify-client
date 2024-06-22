import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import useScrollOpacity from '../../hooks/useScrollOpacity'
import { useAuth } from '../../hooks/useAuth'
import { useLibrary } from '../../hooks/useLibrary'

import getUserTopItems from '../../api/user/UserTopItems'

import { Artist } from '../../types/Artist'

import Loading from './Loading'
import NotFound from './NotFound'

import ProfileWrapper from '../../components/wrappers/ProfileWrapper'
import { TabContent, TabItems, TabMenu, TabTrigger } from '../../components/TabMenu'
import BackgroundColour from '../../components/BackgroundColour'
import TrackList from '../../components/songs/TrackList'
import { Carousel, CarouselContainer, CarouselSlide } from '../../components/carousel/Carousel'
import ContentCard from '../../components/content/ContentCard'
import Footer from '../../components/Footer'

const Profile = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format
    const { opacity } = useScrollOpacity()
    const { user } = useAuth()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
    } = useQuery({
        queryKey: ['most-listened-to'],
        queryFn: async () => getUserTopItems(),
        enabled: user !== null,
        staleTime: 300000, // 1000 * 300 seconds
    })

    useEffect(() => {
        setColour('16, 88, 184')
    }, [])

    const isLoading = libraryLoading || userLoading
    const isError = libraryError || userError

    let playlists
    if (user && libraryData) {
        playlists = libraryData.playlists.filter((playlist) => playlist.owner.display_name === user.display_name)
    }

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        userData &&
        playlists && (
            <ProfileWrapper
                user={user}
                colour={colour}
            >
                <TabMenu>
                    <TabItems className="sticky top-[64px] z-50">
                        <BackgroundColour opacity={opacity} />
                        <div className="mx-auto max-w-[1400px]">
                            <TabTrigger
                                value="tab-1"
                                title="Overview"
                            />
                            <TabTrigger
                                value="tab-2"
                                title="All Top Tracks"
                            />
                        </div>
                    </TabItems>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-1"
                    >
                        <TrackList
                            title="Top tracks this month"
                            songs={userData.top_tracks}
                            header={false}
                            album={true}
                            shallow={true}
                        />
                        <Carousel title={'Top artists this month'}>
                            <CarouselContainer>
                                {userData.top_artists.map((artist: Artist) => (
                                    <CarouselSlide key={artist.id}>
                                        <ContentCard
                                            image={
                                                artist.images && artist.images[0]
                                                    ? artist.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={artist.name}
                                            subtitle={'Artist'}
                                            href={`/${artist.type}/${artist.id}`}
                                        />
                                    </CarouselSlide>
                                ))}
                            </CarouselContainer>
                        </Carousel>
                        <Carousel title={'Your playlists'}>
                            <CarouselContainer>
                                {playlists.map((playlist) => (
                                    <CarouselSlide key={playlist.id}>
                                        <ContentCard
                                            image={
                                                playlist.images && playlist.images[0]
                                                    ? playlist.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={playlist.name}
                                            subtitle={`By ${playlist.owner.display_name}`}
                                            href={`/${playlist.type}/${playlist.id}`}
                                        />
                                    </CarouselSlide>
                                ))}
                            </CarouselContainer>
                        </Carousel>
                        <Footer />
                    </TabContent>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-2"
                    >
                        <TrackList
                            songs={userData.top_tracks}
                            header={false}
                            album={true}
                        />
                        <Footer />
                    </TabContent>
                </TabMenu>
            </ProfileWrapper>
        )
    )
}

export default Profile
