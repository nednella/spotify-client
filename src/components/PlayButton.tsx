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
    const isPlaying = !player.playerState?.paused
    const isThisContextActive = player.playerState?.context.uri === contextUri

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isThisContextActive) {
            if (isPlaying) {
                player.pause()
            } else player.play()
        } else {
            player.playContext(contextUri)
        }
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
                    text-black
                    shadow-lg
                    shadow-black/50
                    transition
                    hover:scale-105
                `,
                className
            )}
        >
            {isPlaying && isThisContextActive ? <IoIosPause size={size} /> : <RiPlayLargeFill size={size} />}
        </button>
    )
}

export default PlayButton
