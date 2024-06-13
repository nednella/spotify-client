import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { PiHeartFill } from 'react-icons/pi'
import React from 'react'

interface LikedSongsProps {
    active: boolean
    href: string
}

const LikedSongs: React.FC<LikedSongsProps> = ({ active, href }) => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(href)}
            className="
                flex
                w-full
                flex-1
                items-center
                justify-between
                px-3
                py-4
            "
        >
            <div
                className={twMerge(
                    `
                        inline-flex
                        items-center
                        gap-x-4
                        text-neutral-400
                        transition
                        hover:text-white
                    `,
                    active && 'text-white-500'
                )}
            >
                <PiHeartFill
                    size={26}
                    className=""
                />
                <p className="text-md font-medium">Liked songs</p>
            </div>
        </button>
    )
}

export default LikedSongs
