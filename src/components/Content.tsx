import React from 'react'

import Container from './Container'

interface ContentProps {
    children: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className="h-full flex-1 overflow-hidden py-2 pr-2">
            <Container className="h-full overflow-y-auto">{children}</Container>
        </div>
    )
}

export default Content
