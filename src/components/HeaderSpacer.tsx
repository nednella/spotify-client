import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderSpacerProps {
    className?: string
}

// Prevents page content from laying underneath the header where applicable

const HeaderSpacer: React.FC<HeaderSpacerProps> = ({ className }) => {
    return <div className={twMerge('h-[64px] w-full', className)}></div>
}

export default HeaderSpacer
