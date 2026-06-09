import React from 'react'

import { Artist } from '../../../../../types/Artist'

import { toTitleCase } from '../../../../../common/toTitleCase'

import ContentContainer from '../../../../../components/PageContentContainer'
import ContentSection from '../../../../../components/content/ContentSection'
import ContentCard from '../../../../../components/content/ContentCard'
import Footer from '../../../../../components/Footer'

interface ArtistsProps {
    query: string | undefined
    artists: Artist[]
}

const Artists: React.FC<ArtistsProps> = ({ query, artists }) => {
    return (
        <ContentContainer>
            {artists && artists.length > 0 ? (
                <ContentSection className="my-8">
                    {artists.map((artist: Artist) => (
                        <ContentCard
                            uri={artist.uri}
                            key={artist.id}
                            image={
                                artist.images && artist.images[0]
                                    ? artist.images[0].url
                                    : '../../src/assets/images/liked.png'
                            }
                            title={artist.name}
                            subtitle={toTitleCase(artist.type)}
                            href={`/${artist.type}/${artist.id}`}
                        />
                    ))}
                </ContentSection>
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 pb-20 pt-40">
                    <span className="text-2xl font-bold">No artists found for '{query}'</span>
                    <span>Please make sure your words are spelled correctly, or use fewer or different keywords.</span>
                </div>
            )}
            <Footer />
        </ContentContainer>
    )
}

export default Artists
