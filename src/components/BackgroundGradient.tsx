import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BackgroundGradientProps {
    colour?: string
    className?: string
    size?: string
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ colour, className, size }) => {
    return (
        <div
            className={twMerge(
                'absolute top-0 w-full',
                className,
                size === 'large' ? 'h-[400px]' : size === 'medium' ? 'h-[300px]' : 'h-[200px]'
            )}
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: colour ? 'linear-gradient(rgba(0, 0, 0, .6) 0, rgb(23, 23, 23) 100%)' : '',
            }}
        ></div>
    )
}

export default BackgroundGradient
