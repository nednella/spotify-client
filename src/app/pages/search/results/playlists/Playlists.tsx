import React from 'react'

import { SimplifiedPlaylist } from '../../../../../types/Playlist'

import ContentContainer from '../../../../../components/PageContentContainer'
import ContentCard from '../../../../../components/content/ContentCard'
import ContentSection from '../../../../../components/content/ContentSection'
import Footer from '../../../../../components/Footer'

interface PlaylistsProps {
    query: string | undefined
    playlists: SimplifiedPlaylist[]
}

const Playlists: React.FC<PlaylistsProps> = ({ query, playlists }) => {
    return (
        <ContentContainer>
            {playlists && playlists.length > 0 ? (
                <ContentSection className="my-8">
                    {playlists.map((playlist: SimplifiedPlaylist) => (
                        <ContentCard
                            uri={playlist.uri}
                            key={playlist.id}
                            image={
                                playlist.images && playlist.images[0]
                                    ? playlist.images[0].url
                                    : '../src/assets/images/placeholder.png'
                            }
                            title={playlist.name}
                            subtitle={`By ${playlist.owner.display_name}`}
                            href={`/${playlist.type}/${playlist.id}`}
                        />
                    ))}
                </ContentSection>
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 pb-20 pt-40">
                    <span className="text-2xl font-bold">No playlists found for '{query}'</span>
                    <span>Please make sure your words are spelled correctly, or use fewer or different keywords.</span>
                </div>
            )}
            <Footer />
        </ContentContainer>
    )
}

export default Playlists
