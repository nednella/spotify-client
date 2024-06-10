import * as RSeparator from '@radix-ui/react-separator'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SeparatorProps {
    className: string
}

const Separator: React.FC<SeparatorProps> = ({ className }) => {
    return (
        <RSeparator.Root
            className={twMerge(
                `
                    data-[orientation=horizontal]:h-px
                    data-[orientation=vertical]:w-px
                `,
                className
            )}
        />
    )
}

export default Separator
