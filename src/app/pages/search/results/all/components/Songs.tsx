import React from 'react'

import { Track } from '../../../../../../types/Track'
import TrackList from '../../../../../../components/songs/TrackList'

interface SongsProps {
    songs: Track[]
}

const Songs: React.FC<SongsProps> = ({ songs }) => {
    if (songs && songs.length > 0)
        return (
            <>
                <div className="mb-4 mt-2 select-none">
                    <span className="text-2xl font-bold">Songs</span>
                </div>
                <TrackList
                    tracks={songs.slice(0, 5)}
                    header={false}
                />
            </>
        )
}

export default Songs
