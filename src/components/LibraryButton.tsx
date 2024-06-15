import React from 'react'
import { twMerge } from 'tailwind-merge'

import { GrFormCheckmark } from 'react-icons/gr'
import { MdAdd } from 'react-icons/md'
import Tooltip from './Tooltip'

interface ButtonProps {
    children: React.ReactNode
    className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
    return (
        <button
            className={twMerge(
                `
                    group
                    flex
                    items-center
                    rounded-full
                    border-2
                    border-green-500
                    bg-green-500
                    drop-shadow-md
                    transition
                    hover:scale-105
                `,
                className
            )}
        >
            {children}
        </button>
    )
}

interface LibraryButtonProps {
    inLibrary: boolean
    size: number
}

const LibraryButton: React.FC<LibraryButtonProps> = ({ inLibrary, size }) => {
    return inLibrary ? (
        <Tooltip message="Remove from Your Library">
            <Button>
                <GrFormCheckmark
                    size={size}
                    className="text-black"
                />
            </Button>
        </Tooltip>
    ) : (
        <Tooltip message="Add to Your Library">
            <Button className="border-2 border-neutral-500 bg-transparent hover:border-white">
                <MdAdd
                    size={size}
                    className="text-neutral-500 transition group-hover:text-white"
                />
            </Button>
        </Tooltip>
    )
}

export default LibraryButton
