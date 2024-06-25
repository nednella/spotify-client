import React from 'react'

interface ContentSectionProps {
    title?: string
    children: React.ReactNode
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, children }) => {
    return (
        <section className="flex select-none flex-col">
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
