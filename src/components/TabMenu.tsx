import React from 'react'
import { twMerge } from 'tailwind-merge'

import * as Tabs from '@radix-ui/react-tabs'

interface TabMenuProps {
    className?: string
    children: React.ReactNode
}

interface TabItemsProps {
    className?: string
    children: React.ReactNode
}

interface TabTriggerProps {
    value: string
    title: string
}

interface TabContentProps {
    value: string
    className?: string
    children: React.ReactNode
}

export const TabMenu: React.FC<TabMenuProps> = ({ className, children }) => (
    <Tabs.Root
        className={twMerge(
            `
                flex w-full flex-col
            `,
            className
        )}
        defaultValue="tab-1"
    >
        {children}
    </Tabs.Root>
)

export const TabItems: React.FC<TabItemsProps> = ({ className, children }) => (
    <Tabs.List
        className={twMerge(
            `
                inline-block
                border-b
                border-neutral-400/50
            `,
            className
        )}
        aria-label="Artist page options"
    >
        {children}
    </Tabs.List>
)

export const TabTrigger: React.FC<TabTriggerProps> = ({ value, title }) => (
    <Tabs.Trigger
        value={value}
        className="
            h-[35px]
            flex-1
            cursor-pointer
            select-none
            items-center
            justify-center
            border-b-2
            border-transparent
            px-5
            text-sm
            font-medium
            text-neutral-400
            outline-none
            transition
            hover:text-white
            data-[state=active]:border-b-green-500
            data-[state=active]:text-white
        "
    >
        {title}
    </Tabs.Trigger>
)
export const TabContent: React.FC<TabContentProps> = ({ value, className, children }) => (
    <Tabs.Content
        value={value}
        className={twMerge(
            `   
                h-fit
                w-full
                p-4
                outline-none
            `,
            className
        )}
    >
        {children}
    </Tabs.Content>
)
