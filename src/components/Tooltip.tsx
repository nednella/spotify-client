import React from 'react'
import * as RTooltip from '@radix-ui/react-tooltip'

interface TooltipProps {
    message: string
    children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
    return (
        <RTooltip.Provider delayDuration={250}>
            <RTooltip.Root>
                <RTooltip.Trigger>{children}</RTooltip.Trigger>
                <RTooltip.Portal>
                    <RTooltip.Content
                        className="
                            data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
                            data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade
                            data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade
                            data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
                            z-[999]
                            select-none
                            rounded-md
                            bg-neutral-800
                            px-4
                            py-2
                            text-sm
                            font-medium
                            leading-none
                            text-white
                            shadow-lg
                            shadow-black/30
                            transition
                            will-change-[transform,opacity]
                        "
                        sideOffset={10}
                    >
                        {message}
                        <RTooltip.Arrow
                            height={8}
                            width={12}
                            className="fill-neutral-800"
                        />
                    </RTooltip.Content>
                </RTooltip.Portal>
            </RTooltip.Root>
        </RTooltip.Provider>
    )
}

export default Tooltip
