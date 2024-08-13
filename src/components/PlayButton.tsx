import React from 'react'
import { twMerge } from 'tailwind-merge'

import { RiPlayLargeFill } from 'react-icons/ri'
import { IoIosPause } from 'react-icons/io'
import usePlayer from '../hooks/usePlayer'

interface PlayButtonProps {
    contextUri: string
    size: number
    className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ contextUri, size, className }) => {
    const player = usePlayer()
    const isThisContextPlaying = player.playerState.context.uri && player.playerState.context.uri === contextUri

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        player.playContext(contextUri)
    }

    return (
        <button
            onClick={(e) => handleClick(e)}
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
            {isThisContextPlaying ? (
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
