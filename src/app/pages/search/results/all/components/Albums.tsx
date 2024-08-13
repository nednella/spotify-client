import React from 'react'

import { SimplifiedAlbum } from '../../../../../../types/Album'

import { Carousel, CarouselContainer, CarouselSlide } from '../../../../../../components/carousel/Carousel'
import ContentCard from '../../../../../../components/content/ContentCard'

interface AlbumsProps {
    albums: SimplifiedAlbum[]
}

const Albums: React.FC<AlbumsProps> = ({ albums }) => {
    if (albums && albums.length > 0)
        return (
            <Carousel
                title={'Albums'}
                className="mt-8"
            >
                <CarouselContainer>
                    {albums.slice(0, 20).map((album: SimplifiedAlbum) => (
                        <CarouselSlide key={album.id}>
                            <ContentCard
                                uri={album.uri}
                                image={
                                    album.images && album.images[0]
                                        ? album.images[0].url
                                        : '../src/assets/images/liked.png'
                                }
                                title={album.name}
                                subtitle={`${album.release_date.substring(0, 4)} \u2022 ${album.artists[0].name}`}
                                href={`/${album.type}/${album.id}`}
                            />
                        </CarouselSlide>
                    ))}
                </CarouselContainer>
            </Carousel>
        )
}

export default Albums
