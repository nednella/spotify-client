import React from 'react'
import { twMerge } from 'tailwind-merge'

import useColour from '../hooks/useColour'

interface BackgroundGradientProps {
    size?: 'large' | 'medium' | 'small'
    className?: string
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ size, className }) => {
    const { colour } = useColour()

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
