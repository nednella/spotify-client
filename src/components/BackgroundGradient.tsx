import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BackgroundGradientProps {
    colour: string
    size?: string
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ colour, size }) => {
    return (
        <div
            className={twMerge(
                'absolute top-0 w-full',
                size === 'large' ? 'h-[400px]' : size === 'medium' ? 'h-[300px]' : 'h-[200px]'
            )}
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, .6) 0, rgb(23, 23, 23) 100%)',
            }}
        ></div>
    )
}

export default BackgroundGradient
