import React from 'react'
import { Link } from 'react-router-dom'

import useColour from '../../../../hooks/useColour'
import { useAuth } from '../../../../hooks/useAuth'

import { convertAlbumDuration } from '../../../../common/convertAlbumDuration'

import HeaderSpacer from '../../../../components/HeaderSpacer'

interface CollectionHeaderProps {
    count: number
    duration: number
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ count, duration }) => {
    const { colour } = useColour()
    const { user } = useAuth()

    const songs = count.toLocaleString('en', { notation: 'standard' }) // Thousands separator
    const totalListeningLength = convertAlbumDuration(duration)

    return (
        <div
            className="h-fit w-[full] pb-4 md:h-[280px]"
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
            }}
        >
            <HeaderSpacer className="md:hidden" />
            {/* Heading content */}
            <section
                className="
                    mx-auto
                    flex
                    h-full
                    max-w-[1400px]
                    select-none
                    flex-col
                    px-4
                    md:flex-row
                "
            >
                {/* Image container */}
                <div
                    className="
                        mb-4
                        max-h-[288px]
                        min-h-[128px]
                        w-[40vw]
                        min-w-[128px]
                        max-w-[288px]
                        self-center
                        md:mb-0
                        md:mr-4
                        md:max-h-[128px]
                        md:max-w-[128px]
                        md:self-end
                    "
                >
                    {/* Image */}
                    <img
                        className="
                            aspect-square
                            rounded-md
                            object-cover
                        "
                        src="../src/assets/images/liked.png"
                    />
                </div>
                {/* Details container */}
                <div
                    className="
                        flex
                        flex-col
                        gap-y-2
                        overflow-hidden
                        md:self-end
                    "
                >
                    {/* Details */}
                    <p className="hidden md:block">Playlist</p>
                    <p
                        className="
                            text-3xl
                            font-bold
                            md:text-5xl
                            md:font-extrabold
                        "
                    >
                        Liked Songs
                    </p>
                    <div
                        className="
                            flex
                            flex-col
                            flex-wrap
                            text-sm
                            font-normal
                            md:flex-row
                        "
                    >
                        <Link
                            to={'/profile'}
                            className="font-bold hover:underline"
                        >
                            {user!.display_name}
                        </Link>
                        <span className="mx-1 hidden md:block">&bull;</span>
                        <span>
                            {songs} {songs === '1' ? 'song' : 'songs'}, {totalListeningLength}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CollectionHeader
