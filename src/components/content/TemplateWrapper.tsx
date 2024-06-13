import React, { useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

import Header from '../Header'
import ScrollArea from '../ScrollArea'

interface ContentWrapperProps {
    children: React.ReactNode
    contentRef?: React.RefObject<HTMLElement>
    colour?: string
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ colour, contentRef, children }) => {
    const [opacity, setOpacity] = useState('0')

    // TODO: restrict functionality to authenticated user state to prevent warning
    // Scroll header opacity functionality
    const scrollAreaRef = useRef(null)

    const { scrollYProgress } = useScroll({
        // FROM - start of 'target' 64px away from start of 'container' (bottom of header)
        // TO - start of 'target' 0px away from start of 'container' (top of header)
        target: contentRef,
        container: scrollAreaRef,
        offset: ['start 64px', 'start 0px'],
    })
    scrollYProgress.on('change', (value) => setOpacity(value.toString()))

    return (
        <>
            <Header
                colour={colour}
                opacity={opacity}
            />
            <ScrollArea
                ref={scrollAreaRef}
                className="relative"
            >
                {children}
            </ScrollArea>
        </>
    )
}

export default ContentWrapper
