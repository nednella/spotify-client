import React from 'react'
import { Link } from 'react-router-dom'

import PlayButton from '../PlayButton'

interface ContentCardProps {
    image?: string
    title: string
    subtitle: string
}

const ContentCard: React.FC<ContentCardProps> = ({ image, title, subtitle }) => {
    // TODO: rounded-full on image for artist content
    return (
        <Link
            to={''}
            className="
                group
                flex
                max-w-[210px]
                cursor-pointer
                flex-col
                gap-y-2
                rounded-lg
                p-4
                transition
                hover:bg-neutral-800
            "
        >
            <div className="relative flex flex-grow items-center justify-center">
                <img
                    src={image || './src/assets/images/liked.png'}
                    className="rounded-md object-cover"
                    alt=""
                />
                <PlayButton
                    isPlaying={false}
                    size={24}
                    className="
                        absolute
                        bottom-0
                        right-0
                        mb-2
                        mr-2
                        translate-y-1/4
                        opacity-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                    "
                />
            </div>
            <div className="h-16 w-full overflow-hidden text-left">
                <p className="truncate font-normal">{title}</p>
                <p className="truncate text-wrap text-sm text-neutral-400">{subtitle}</p>
            </div>
        </Link>
    )
}

export default ContentCard
