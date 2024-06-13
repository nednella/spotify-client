import React from 'react'
import * as RAccordion from '@radix-ui/react-accordion'
import { twMerge } from 'tailwind-merge'

import { IconType } from 'react-icons'
import { FiChevronRight } from 'react-icons/fi'

interface AccordionProps {
    children: React.ReactNode
    className?: string
}

interface AccordionItemProps {
    value: string
    children: React.ReactNode
    className?: string
}

interface AccordionTriggerProps {
    icon: IconType
    label: string
    className?: string
}

interface AccordionContentProps {
    children: React.ReactNode
    className?: string
}

export const Accordion: React.FC<AccordionProps> = ({ children, className }) => (
    <RAccordion.Root
        className={twMerge('w-full', className)}
        type="single"
        defaultValue="item-1"
        collapsible
    >
        {children}
    </RAccordion.Root>
)

export const AccordionItem: React.FC<AccordionItemProps> = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ value, children, className, ...props }, forwardedRef) => (
        <RAccordion.Item
            value={value}
            className={twMerge(
                `
                    overflow-hidden
                `,
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </RAccordion.Item>
    )
)

export const AccordionTrigger: React.FC<AccordionTriggerProps> = React.forwardRef<
    HTMLButtonElement,
    AccordionTriggerProps
>(({ icon: Icon, label, className, ...props }, forwardedRef) => (
    <RAccordion.Header className="flex">
        <RAccordion.Trigger
            className={twMerge(
                `
                        group
                        flex
                        flex-1
                        items-center
                        justify-between
                        px-3
                        py-4
                    `,
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div
                className="
                        inline-flex
                        items-center
                        gap-x-4
                        text-neutral-400
                        transition
                        group-hover:text-white
                        group-data-[state=open]:text-green-500
                    "
            >
                <Icon
                    size={26}
                    className=""
                />
                <p className="text-md font-medium">{label}</p>
            </div>
            <FiChevronRight
                size={20}
                className="
                        text-violet10
                        cursor-pointer
                        text-neutral-400
                        transition-transform
                        duration-300
                        ease-[cubic-bezier(0.87,_0,_0.13,_1)]
                        group-hover:text-white
                        group-data-[state=open]:rotate-90
                        group-data-[state=open]:text-green-500
                    "
            />
        </RAccordion.Trigger>
    </RAccordion.Header>
))

export const AccordionContent: React.FC<AccordionContentProps> = React.forwardRef<
    HTMLDivElement,
    AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
    <RAccordion.Content
        className={twMerge(
            `
                    overflow-hidden
                    data-[state=closed]:animate-slideUp
                    data-[state=open]:animate-slideDown
                `,
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {/* IMPORTANT: Must not specify any padding on Accordion.Content as it creates a laggy animation */}
        <div className="py-4">{children}</div>{' '}
    </RAccordion.Content>
))
