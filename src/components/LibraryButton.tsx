import React from 'react'
import { twMerge } from 'tailwind-merge'

import { GrFormCheckmark } from 'react-icons/gr'
import { MdAdd } from 'react-icons/md'
import Tooltip from './Tooltip'

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div
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
        </div>
    )
}

interface LibraryButtonProps {
    inLibrary: boolean
    size: number
    className?: string
}

const LibraryButton: React.FC<LibraryButtonProps> = ({ inLibrary, size, className, ...props }) => {
    return inLibrary ? (
        <Tooltip message="Remove from Your Library">
            <Container
                className={className}
                {...props}
            >
                <GrFormCheckmark
                    size={size}
                    className="text-black"
                />
            </Container>
        </Tooltip>
    ) : (
        <Tooltip message="Add to Your Library">
            <Container
                className={twMerge('border-2 border-neutral-500 bg-transparent hover:border-white', className)}
                {...props}
            >
                <MdAdd
                    size={size}
                    className="text-neutral-500 transition group-hover:text-white"
                />
            </Container>
        </Tooltip>
    )
}

export default LibraryButton
