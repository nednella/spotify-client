import React from 'react'

import { SimplifiedAlbum } from '../../../../../types/Album'

import ContentContainer from '../../../../../components/PageContentContainer'
import ContentCard from '../../../../../components/content/ContentCard'
import ContentSection from '../../../../../components/content/ContentSection'
import Footer from '../../../../../components/Footer'

interface AlbumProps {
    query: string | undefined
    albums: SimplifiedAlbum[]
}

const Albums: React.FC<AlbumProps> = ({ query, albums }) => {
    return (
        <ContentContainer>
            {albums && albums.length > 0 ? (
                <ContentSection className="my-8">
                    {albums.map((album: SimplifiedAlbum) => (
                        <ContentCard
                            id={album.id}
                            key={album.id}
                            image={
                                album.images && album.images[0] ? album.images[0].url : '../src/assets/images/liked.png'
                            }
                            title={album.name}
                            subtitle={`${album.release_date.substring(0, 4)} \u2022 ${album.artists[0].name}`}
                            href={`/${album.type}/${album.id}`}
                        />
                    ))}
                </ContentSection>
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 pb-20 pt-40">
                    <span className="text-2xl font-bold">No albums found for '{query}'</span>
                    <span>Please make sure your words are spelled correctly, or use fewer or different keywords.</span>
                </div>
            )}
            <Footer />
        </ContentContainer>
    )
}

export default Albums
