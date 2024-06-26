import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { RiPlayLargeFill } from 'react-icons/ri'
import { IoIosPause } from 'react-icons/io'

interface PlayButtonProps {
    contentId: string
    size: number
    className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ size, className }) => {
    const [isPlaying] = useState(false)

    // TODO: integrate usePlayer and current_track id vs loaded content ID
    // to determine playing states

    return (
        <button
            className={twMerge(
                `
                    flex
                    items-center
                    rounded-full
                    bg-green-500
                    p-3
                    shadow-lg
                    shadow-black/50
                    transition
                    hover:scale-105
                `,
                className
            )}
        >
            {isPlaying ? (
                <IoIosPause
                    className="text-black"
                    size={size}
                />
            ) : (
                <RiPlayLargeFill
                    className="text-black"
                    size={size}
                />
            )}
        </button>
    )
}

export default PlayButton
