import React from 'react'
import { Link } from 'react-router-dom'

import PlayButton from '../PlayButton'
import { twMerge } from 'tailwind-merge'

interface ContentCardProps {
    id: string
    image: string
    title: string
    subtitle: string
    href: string
}

const ContentCard: React.FC<ContentCardProps> = ({ id, image, title, subtitle, href }) => {
    // TODO: rounded-full on image for artist content
    return (
        <Link
            to={href}
            className="
                group
                flex
                min-w-0
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
            <div
                className="
                    relative
                    flex
                    items-center
                    justify-center
                "
            >
                <img
                    src={image}
                    className={twMerge(
                        `
                            aspect-square
                            rounded-md
                            object-cover
                        `,
                        subtitle === 'Artist' && 'rounded-full'
                    )}
                    alt="Content image"
                />
                <PlayButton
                    contentId={id}
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
            <div className="h-fit max-h-16 w-full overflow-hidden text-left">
                <p className="truncate font-normal">{title}</p>
                <p className="line-clamp-2 truncate text-wrap text-sm text-neutral-400">{subtitle}</p>
            </div>
        </Link>
    )
}

export default ContentCard
