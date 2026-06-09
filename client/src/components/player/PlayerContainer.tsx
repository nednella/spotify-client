import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PlayerContainerProps {
    children: React.ReactNode
    className?: string
}

const PlayerContainer: React.FC<PlayerContainerProps> = ({ children, className }) => {
    return <div className={twMerge('md:col-span-2', className)}>{children}</div>
}

export default PlayerContainer
