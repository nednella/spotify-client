import React from 'react'

import { Artist } from '../../../../../../types/Artist'

import { toTitleCase } from '../../../../../../common/toTitleCase'

import { Carousel, CarouselContainer, CarouselSlide } from '../../../../../../components/carousel/Carousel'
import ContentCard from '../../../../../../components/content/ContentCard'

interface ArtistsProps {
    artists: Artist[]
}

const Artists: React.FC<ArtistsProps> = ({ artists }) => {
    if (artists && artists.length > 0)
        return (
            <Carousel
                title={'Artists'}
                className="mt-8"
            >
                <CarouselContainer>
                    {artists.slice(0, 20).map((artist: Artist) => (
                        <CarouselSlide key={artist.id}>
                            <ContentCard
                                uri={artist.uri}
                                image={
                                    artist.images && artist.images[0]
                                        ? artist.images[0].url
                                        : '../src/assets/images/liked.png'
                                }
                                title={artist.name}
                                subtitle={`${toTitleCase(artist.type)}`}
                                href={`/${artist.type}/${artist.id}`}
                            />
                        </CarouselSlide>
                    ))}
                </CarouselContainer>
            </Carousel>
        )
}

export default Artists
