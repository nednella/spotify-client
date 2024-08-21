import React from 'react'
import { Link } from 'react-router-dom'
import { SimplifiedArtist } from '../../types/Artist'

interface MediaItemProps {
    title: string
    img: string
    artists: SimplifiedArtist[] | Spotify.Artist[]
}

const MediaItem: React.FC<MediaItemProps> = ({ title, img, artists }) => {
    return (
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
                    src={img}
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
                <span className="truncate text-base text-white">{title}</span>
                {/* Track artists */}
                <div className="overflow-hidden truncate">
                    {artists.map((artist, index) => (
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
                            {index < artists.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MediaItem
