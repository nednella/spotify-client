import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import { useLibrary } from '../../../hooks/useLibrary'
import useGetArtist from '../../../hooks/useGetArtist'

import { Artist as ArtistType } from '../../../types/Artist'
import { SimplifiedAlbum } from '../../../types/Album'

import { toTitleCase } from '../../../common/toTitleCase'

import Loading from '../Loading'
import NotFound from '../NotFound'

import ArtistWrapper from './components/ArtistWrapper'
import { TabMenu, TabItems, TabTrigger, TabContent } from '../../../components/TabMenu'
import BackgroundColour from '../../../components/BackgroundColour'
import ActionBar from '../../../components/ActionBar'
import TrackList from '../../../components/tracks/TrackList'
import { Carousel, CarouselContainer, CarouselSlide } from '../../../components/carousel/Carousel'
import ContentCard from '../../../components/content/ContentCard'
import ContentSection from '../../../components/content/ContentSection'
import Footer from '../../../components/Footer'

const Artist = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { id } = useParams()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const { data: artistData, isLoading: artistLoading, isError: artistError } = useGetArtist(user, id)

    useEffect(() => {
        setColour(['56', '144', '176'])
    }, [setColour])

    const isLoading = libraryLoading || artistLoading
    const isError = libraryError || artistError

    if (!id) return <NotFound />

    let most_recent, albums, singles
    if (artistData) {
        // Cap most recent to 20 items
        most_recent = artistData.albums.slice(0, 20)

        // Sort oldest to newest (newest -> oldest separates albums from singles in the sort)
        most_recent = most_recent.sort(
            (a: SimplifiedAlbum, b: SimplifiedAlbum) =>
                Number(a.release_date.substring(0, 4)) - Number(b.release_date.substring(0, 4))
        )

        // Reverse sort to newest to oldest
        most_recent = most_recent.reverse()
        albums = artistData.albums.filter((album: SimplifiedAlbum) => album.album_type === 'album')
        singles = artistData.albums.filter((album: SimplifiedAlbum) => album.album_type === 'single')
    }

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData &&
        artistData && (
            <ArtistWrapper artist={artistData.artist}>
                <TabMenu>
                    <TabItems className="sticky top-[64px] z-50">
                        <BackgroundColour defaultClr={true} />
                        <div className="mx-auto max-w-[1400px]">
                            <TabTrigger
                                value="tab-1"
                                title="Home"
                            />
                            <TabTrigger
                                value="tab-2"
                                title="Albums"
                            />
                            <TabTrigger
                                value="tab-3"
                                title="Singles & EPs"
                            />
                        </div>
                    </TabItems>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-1"
                    >
                        <ActionBar
                            library={libraryData.artists}
                            content={artistData.artist}
                            isUserCreated={false}
                        />
                        <div className="mb-4 mt-2 select-none">
                            <span className="text-2xl font-bold">Popular</span>
                        </div>
                        <TrackList
                            tracks={artistData.top_tracks.slice(0, 5)}
                            header={false}
                        />
                        <Carousel
                            title={'Most recent releases'}
                            className="mt-8"
                        >
                            <CarouselContainer>
                                {most_recent.map((album: SimplifiedAlbum) => (
                                    <CarouselSlide key={album.id}>
                                        <ContentCard
                                            uri={album.uri}
                                            image={
                                                album.images && album.images[0]
                                                    ? album.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={album.name}
                                            subtitle={`${album.release_date.substring(0, 4)} \u2022 ${toTitleCase(album.album_type)}`}
                                            href={`/${album.type}/${album.id}`}
                                        />
                                    </CarouselSlide>
                                ))}
                            </CarouselContainer>
                        </Carousel>
                        <Carousel
                            title={'Fans also like'}
                            className="mt-8"
                        >
                            <CarouselContainer>
                                {artistData.related_artists.map((artist: ArtistType) => (
                                    <CarouselSlide key={artist.id}>
                                        <ContentCard
                                            uri={artist.uri}
                                            image={
                                                artist.images && artist.images[0]
                                                    ? artist.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={artist.name}
                                            subtitle={toTitleCase(artist.type)}
                                            href={`/${artist.type}/${artist.id}`}
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
                        {albums.length > 0 ? (
                            <>
                                <ContentSection>
                                    {albums.map((album: SimplifiedAlbum) => (
                                        <ContentCard
                                            uri={album.uri}
                                            key={album.id}
                                            image={
                                                album.images && album.images[0]
                                                    ? album.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={album.name}
                                            subtitle={`${album.release_date.substring(0, 4)} \u2022 ${toTitleCase(album.album_type)}`}
                                            href={`/${album.type}/${album.id}`}
                                        />
                                    ))}
                                </ContentSection>
                                <Footer />
                            </>
                        ) : (
                            <div className="mt-10 flex items-center justify-center">
                                <p className="font-medium">It appears this artist has not released any albums.</p>
                            </div>
                        )}
                    </TabContent>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-3"
                    >
                        {singles.length > 0 ? (
                            <>
                                <ContentSection>
                                    {singles.map((album: SimplifiedAlbum) => (
                                        <ContentCard
                                            uri={album.uri}
                                            key={album.id}
                                            image={
                                                album.images && album.images[0]
                                                    ? album.images[0].url
                                                    : '../src/assets/images/liked.png'
                                            }
                                            title={album.name}
                                            subtitle={`${album.release_date.substring(0, 4)} \u2022 ${toTitleCase(album.album_type)}`}
                                            href={`/${album.type}/${album.id}`}
                                        />
                                    ))}
                                </ContentSection>
                                <Footer />
                            </>
                        ) : (
                            <div className="mt-10 flex items-center justify-center">
                                <p className="font-medium">It appears this artist has not released any singles.</p>
                            </div>
                        )}
                    </TabContent>
                </TabMenu>
            </ArtistWrapper>
        )
    )
}

export default Artist
