import { useEffect } from 'react'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import { useLibrary } from '../../../hooks/useLibrary'
import useGetGenre from '../../../hooks/useGetGenre'
import useGetAlbumReleases from '../../../hooks/useGetAlbumReleases'
import useGetFeaturedPlaylists from '../../../hooks/useGetFeaturedPlaylists'

import { SimplifiedPlaylist } from '../../../types/Playlist'
import { SimplifiedAlbum } from '../../../types/Album'

import Loading from '../Loading'

import HomeWrapper from './components/HomeWrapper'
import { Carousel, CarouselContainer, CarouselSlide } from '../../../components/carousel/Carousel'
import ContentCard from '../../../components/content/ContentCard'

const Home = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { data: library, isLoading: isLoading1 } = useLibrary()
    const { data: discover, isLoading: isLoading2 } = useGetGenre(user, 'discover')
    const { data: throwback, isLoading: isLoading3 } = useGetGenre(user, 'throwback')
    const { data: album_releases, isLoading: isLoading4 } = useGetAlbumReleases(user)
    const { data: featured_playlists, isLoading: isLoading5 } = useGetFeaturedPlaylists(user)

    useEffect(() => {
        setColour(['29', '185', '84'])
    }, [setColour])

    if (!user)
        return (
            <HomeWrapper>
                <p>You are logged out.</p>
            </HomeWrapper>
        )

    const isLoading = isLoading1 || isLoading2 || isLoading3 || isLoading4 || isLoading5

    return isLoading ? (
        <Loading />
    ) : (
        <HomeWrapper>
            {discover && (
                <Carousel title={`Made for ${user.display_name}`}>
                    <CarouselContainer>
                        {discover.playlists.slice(0, 20).map((playlist: SimplifiedPlaylist) => (
                            <CarouselSlide key={playlist.id}>
                                <ContentCard
                                    uri={playlist.uri}
                                    image={
                                        playlist.images && playlist.images[0]
                                            ? playlist.images[0].url
                                            : '../src/assets/images/placeholder.png'
                                    }
                                    title={playlist.name}
                                    subtitle={playlist.description}
                                    href={`/${playlist.type}/${playlist.id}`}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselContainer>
                </Carousel>
            )}

            {album_releases && (
                <Carousel
                    title={'New releases'}
                    className="mt-8"
                >
                    <CarouselContainer>
                        {album_releases.map((album: SimplifiedAlbum) => (
                            <CarouselSlide key={album.id}>
                                <ContentCard
                                    uri={album.uri}
                                    image={
                                        album.images && album.images[0]
                                            ? album.images[0].url
                                            : '../src/assets/images/placeholder.png'
                                    }
                                    title={album.name}
                                    subtitle={`${album.release_date.substring(0, 4)} \u2022 ${album.artists[0].name}`}
                                    href={`/${album.type}/${album.id}`}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselContainer>
                </Carousel>
            )}

            {featured_playlists && (
                <Carousel
                    title={'Featured playlists'}
                    className="mt-8"
                >
                    <CarouselContainer>
                        {featured_playlists.map((playlist: SimplifiedPlaylist) => (
                            <CarouselSlide key={playlist.id}>
                                <ContentCard
                                    uri={playlist.uri}
                                    image={
                                        playlist.images && playlist.images[0]
                                            ? playlist.images[0].url
                                            : '../src/assets/images/placeholder.png'
                                    }
                                    title={playlist.name}
                                    subtitle={playlist.description}
                                    href={`/${playlist.type}/${playlist.id}`}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselContainer>
                </Carousel>
            )}

            {throwback && (
                <Carousel
                    title={'Throwback'}
                    className="mt-8"
                >
                    <CarouselContainer>
                        {throwback.playlists.slice(0, 20).map((playlist: SimplifiedPlaylist) => (
                            <CarouselSlide key={playlist.id}>
                                <ContentCard
                                    uri={playlist.uri}
                                    image={
                                        playlist.images && playlist.images[0]
                                            ? playlist.images[0].url
                                            : '../src/assets/images/placeholder.png'
                                    }
                                    title={playlist.name}
                                    subtitle={playlist.description}
                                    href={`/${playlist.type}/${playlist.id}`}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselContainer>
                </Carousel>
            )}

            <Carousel
                title={'Your playlists'}
                className="mt-8"
            >
                <CarouselContainer>
                    {library.playlists.map((playlist: SimplifiedPlaylist) => (
                        <CarouselSlide key={playlist.id}>
                            <ContentCard
                                uri={playlist.uri}
                                image={
                                    playlist.images && playlist.images[0]
                                        ? playlist.images[0].url
                                        : '../src/assets/images/placeholder.png'
                                }
                                title={playlist.name}
                                subtitle={playlist.description}
                                href={`/${playlist.type}/${playlist.id}`}
                            />
                        </CarouselSlide>
                    ))}
                </CarouselContainer>
            </Carousel>
        </HomeWrapper>
    )
}

export default Home
