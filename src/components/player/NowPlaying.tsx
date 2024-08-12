import React from 'react'
import { Link } from 'react-router-dom'

import usePlayer from '../../hooks/usePlayer'

const NowPlaying = () => {
    const currentTrack = usePlayer((state) => state.playerState?.track_window.current_track)

    return (
        <div className="w-[30%] pl-2">
            {currentTrack && currentTrack.id && (
                <div className="flex h-full items-center text-sm text-neutral-400">
                    {/* Image container */}
                    <div
                        className="
                        mr-2
                        max-h-14
                        max-w-14
                    "
                    >
                        <img
                            className="rounded-[4px] object-cover"
                            src={
                                currentTrack.album.images[0]
                                    ? currentTrack.album.images[0].url
                                    : '../src/assets/images/placeholder.png'
                            }
                            alt="Album artwork"
                            draggable={false}
                        />
                    </div>
                    {/* Details container */}
                    <div
                        className="
                        mr-2
                        flex
                        flex-col
                        overflow-hidden
                    "
                    >
                        {/* Track title */}
                        <span className="truncate text-base text-white">{currentTrack.name}</span>
                        {/* Track artists */}
                        <div className="overflow-hidden truncate">
                            {currentTrack.artists.map((artist, index) => (
                                <React.Fragment key={artist.name}>
                                    <Link
                                        to={`/artist/${artist.uri.split(':').pop()}`}
                                        className="
                                            hover:text-white
                                            hover:underline
                                            group-hover:text-white
                                            group-data-[selected=true]:text-white
                                        "
                                        draggable={false}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < currentTrack.artists.length - 1 && ', '}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NowPlaying
