import React from 'react'
import { twMerge } from 'tailwind-merge'

import { RiPlayLargeFill } from 'react-icons/ri'
import { IoIosPause } from 'react-icons/io'

interface PlayButtonProps {
    isPlaying: boolean
    size: number
    className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, size, className }) => {
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
