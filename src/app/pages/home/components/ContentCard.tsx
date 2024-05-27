import React from 'react'
import { RiPlayLargeFill } from 'react-icons/ri'

interface ContentCardProps {
    image: string
    title: string
    subtitle: string
}

const ContentCard: React.FC<ContentCardProps> = ({ image, title, subtitle }) => {
    // TODO: rounded-full on image for artist content
    return (
        <button
            onClick={() => {}}
            className="
                group
                relative
                flex
                cursor-pointer
                flex-col
                gap-y-2
                rounded-lg
                bg-neutral-400/5
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
                <div
                    className="
                        absolute
                        bottom-0
                        right-0
                        mb-2
                        mr-2
                        flex
                        translate-y-1/4
                        items-center
                        justify-center
                        rounded-full
                        bg-green-500
                        p-3
                        opacity-0
                        transition
                        hover:scale-105
                        group-hover:translate-y-0
                        group-hover:opacity-100
                    "
                >
                    <RiPlayLargeFill
                        className="text-black"
                        size={24}
                    />
                </div>
            </div>
            <div className="h-16 w-full overflow-hidden text-left">
                <p className="truncate font-normal">{title}</p>
                <p className="truncate text-wrap text-sm text-neutral-400">{subtitle}</p>
            </div>
        </button>
    )
}

export default ContentCard
