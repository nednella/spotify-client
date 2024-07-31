import { useEffect } from 'react'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import { useLibrary } from '../../../hooks/useLibrary'
import useGetMostListenedTo from '../../../hooks/useGetMostListenedTo'

import { Artist } from '../../../types/Artist'

import Loading from '../Loading'
import NotFound from '../NotFound'

import ProfileWrapper from './components/ProfileWrapper'
import { TabContent, TabItems, TabMenu, TabTrigger } from '../../../components/TabMenu'
import BackgroundColour from '../../../components/BackgroundColour'
import TrackList from '../../../components/tracks/TrackList'
import { Carousel, CarouselContainer, CarouselSlide } from '../../../components/carousel/Carousel'
import ContentCard from '../../../components/content/ContentCard'
import Footer from '../../../components/Footer'

const Profile = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const { data: profileData, isLoading: profileLoading, isError: profileError } = useGetMostListenedTo(user)

    useEffect(() => {
        setColour(['16', '88', '184'])
    }, [setColour])

    const isLoading = libraryLoading || profileLoading
    const isError = libraryError || profileError

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
        profileData &&
        playlists && (
            <ProfileWrapper user={user}>
                <TabMenu>
                    <TabItems className="sticky top-[64px] z-50">
                        <BackgroundColour defaultClr={true} />
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
                        <div className="mb-4 mt-2 select-none">
                            <span className="text-2xl font-bold">Top tracks this month</span>
                        </div>
                        <TrackList
                            tracks={profileData.top_tracks.slice(0, 5)}
                            header={false}
                            displayAlbum={true}
                        />
                        <Carousel
                            title={'Top artists this month'}
                            className="mt-8"
                        >
                            <CarouselContainer>
                                {profileData.top_artists.map((artist: Artist) => (
                                    <CarouselSlide key={artist.id}>
                                        <ContentCard
                                            id={artist.id}
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
                        <Carousel
                            title={'Your playlists'}
                            className="mt-8"
                        >
                            <CarouselContainer>
                                {playlists.map((playlist) => (
                                    <CarouselSlide key={playlist.id}>
                                        <ContentCard
                                            id={playlist.id}
                                            image={
                                                playlist.images && playlist.images[0]
                                                    ? playlist.images[0].url
                                                    : '../src/assets/images/placeholder.png'
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
                            tracks={profileData.top_tracks}
                            header={false}
                            displayAlbum={true}
                        />
                        <Footer />
                    </TabContent>
                </TabMenu>
            </ProfileWrapper>
        )
    )
}

export default Profile
