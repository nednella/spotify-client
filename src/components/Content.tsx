import React from 'react'

import Container from './Container'

interface ContentProps {
    children: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Container className="relative flex h-full flex-col overflow-y-auto rounded-none md:rounded-lg">
            {children}
        </Container>
    )
}

export default Content
