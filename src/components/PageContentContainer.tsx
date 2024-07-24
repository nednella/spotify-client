import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ContentContainerProps {
    children?: React.ReactNode
    className?: string
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, className }) => {
    return <div className={twMerge('relative px-4', className)}>{children}</div>
}

export default ContentContainer
