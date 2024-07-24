import { Search } from '../../../../../types/Search'

import ContentContainer from '../../../../../components/PageContentContainer'
import Songs from './components/Songs'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Playlists from './components/Playlists'
import Footer from '../../../../../components/Footer'
import React from 'react'

interface AllProps {
    query: string | undefined
    data: Search
}
const All: React.FC<AllProps> = ({ query, data }) => {
    return (
        <ContentContainer>
            {data.albums.length > 0 &&
            data.artists.length > 0 &&
            data.playlists.length > 0 &&
            data.tracks.length > 0 ? (
                <>
                    <Songs songs={data.tracks} />
                    <Artists artists={data.artists} />
                    <Albums albums={data.albums} />
                    <Playlists playlists={data.playlists} />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 pb-20 pt-40">
                    <span className="text-2xl font-bold">No results found for '{query}'</span>
                    <span>Please make sure your words are spelled correctly, or use fewer or different keywords.</span>
                </div>
            )}

            <Footer />
        </ContentContainer>
    )
}

export default All
