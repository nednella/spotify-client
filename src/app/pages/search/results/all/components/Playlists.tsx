import React from 'react'

import { SimplifiedPlaylist } from '../../../../../../types/Playlist'

import { Carousel, CarouselContainer, CarouselSlide } from '../../../../../../components/carousel/Carousel'
import ContentCard from '../../../../../../components/content/ContentCard'

interface PlaylistsProps {
    playlists: SimplifiedPlaylist[]
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
    if (playlists && playlists.length > 0)
        return (
            <Carousel
                title={'Playlists'}
                className="mt-8"
            >
                <CarouselContainer>
                    {playlists.slice(0, 20).map((playlist: SimplifiedPlaylist) => (
                        <CarouselSlide key={playlist.id}>
                            <ContentCard
                                uri={playlist.uri}
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
        )
}

export default Playlists
