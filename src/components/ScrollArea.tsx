import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { twMerge } from 'tailwind-merge'

interface ScrollProps {
    children: React.ReactNode
    className?: string
}

// TODO: allow scrollbar sizing to adjust every time the library size changes (on click of a category)

const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <ScrollArea.Root
                // TODO: uncomment - type="scroll"
                className={twMerge('overflow-hidden', className)}
                {...props}
            >
                <ScrollArea.Viewport
                    ref={forwardedRef}
                    asChild
                    className="!block h-full w-full"
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
    }
)

export default Scroll
