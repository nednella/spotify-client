import * as RSeparator from '@radix-ui/react-separator'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SeparatorProps {
    orientation: 'horizontal' | 'vertical'
    className: string
}

const Separator: React.FC<SeparatorProps> = ({ orientation, className }) => {
    return (
        <RSeparator.Root
            orientation={orientation}
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
