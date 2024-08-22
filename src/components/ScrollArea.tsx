import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { twMerge } from 'tailwind-merge'

interface ScrollProps {
    children: React.ReactNode
    className?: string
}

const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(({ children, className, ...props }, forwardedRef) => {
    return (
        <ScrollArea.Root
            type="scroll"
            className="h-full overflow-hidden"
            {...props}
        >
            <ScrollArea.Viewport
                ref={forwardedRef}
                asChild
                className={twMerge('!block h-full w-full', className)}
            >
                {children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                className="
                        z-[999]
                        touch-none
                        select-none
                        data-[orientation=horizontal]:h-3
                        data-[orientation=vertical]:w-3
                        data-[orientation=horizontal]:flex-col
                    "
                orientation="vertical"
            >
                <ScrollArea.Thumb className="w-full bg-neutral-400/50 hover:bg-neutral-400/70" />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
})

export default Scroll
