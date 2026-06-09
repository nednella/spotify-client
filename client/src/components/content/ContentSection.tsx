import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ContentSectionProps {
    title?: string
    children: React.ReactNode
    className?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, children, className }) => {
    return (
        <section className={twMerge('flex select-none flex-col', className)}>
            {title && (
                <div className="mt-6 flex items-center justify-between pb-1">
                    <p className="text-2xl font-bold">{title}</p>
                </div>
            )}
            <div
                className="
                    grid
                    h-fit
                    w-full
                    grid-cols-2
                    xsm:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6

                "
            >
                {children}
            </div>
        </section>
    )
}

export default ContentSection
