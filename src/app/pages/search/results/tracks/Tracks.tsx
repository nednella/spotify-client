import React from 'react'

import { Track } from '../../../../../types/Track'

import ContentContainer from '../../../../../components/PageContentContainer'
import TrackList from '../../../../../components/tracks/TrackList'
import Footer from '../../../../../components/Footer'

interface TracksProps {
    query: string | undefined
    tracks: Track[]
}

const Tracks: React.FC<TracksProps> = ({ query, tracks }) => {
    return (
        <ContentContainer>
            {tracks && tracks.length > 0 ? (
                <TrackList
                    tracks={tracks}
                    header
                    sticky
                    stickyHeight="110"
                    displayAlbum
                />
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 pb-20 pt-40">
                    <span className="text-2xl font-bold">No tracks found for '{query}'</span>
                    <span>Please make sure your words are spelled correctly, or use fewer or different keywords.</span>
                </div>
            )}
            <Footer />
        </ContentContainer>
    )
}

export default Tracks
