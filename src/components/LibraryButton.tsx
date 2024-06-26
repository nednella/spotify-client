import React from 'react'
import { twMerge } from 'tailwind-merge'

import { GrFormCheckmark } from 'react-icons/gr'
import { MdAdd } from 'react-icons/md'

import Tooltip from './Tooltip'

interface LibraryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

interface ContainerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode
}

const Container = React.forwardRef<HTMLButtonElement, ContainerProps>(
    ({ className, children, ...props }, forwardedRef) => {
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
                        shadow-lg
                        shadow-black/50
                        drop-shadow-md
                        transition
                        hover:scale-105
                    `,
                    className
                )}
                ref={forwardedRef} // forwarded ref for Tooltip.
                {...props}
            >
                {children}
            </button>
        )
    }
)

export default LibraryButton
