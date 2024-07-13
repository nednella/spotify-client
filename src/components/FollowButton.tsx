import React from 'react'
import Button from './Button'
import { twMerge } from 'tailwind-merge'

interface FollowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isInLibrary: boolean
    className?: string
}
const FollowButton: React.FC<FollowButtonProps> = ({ isInLibrary, className, ...props }) => {
    return (
        <Button
            className={twMerge(
                `
                    w-fit
                    border
                    border-neutral-500
                    bg-transparent
                    px-5
                    py-1
                    text-white
                    hover:border-white
                    hover:opacity-100
                `,
                className
            )}
            {...props}
        >
            {isInLibrary ? <p className="font-bold">Following</p> : <p>Follow</p>}
        </Button>
    )
}

export default FollowButton
