import React from 'react'

import Container from './Container'

interface ContentProps {
    children: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className="h-full flex-1 overflow-hidden md:py-2 md:pr-2">
            <Container className="relative flex h-full flex-col overflow-y-auto">
                {children}
            </Container>
        </div>
    )
}

export default Content
