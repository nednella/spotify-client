import React, { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'

import ScrollArea from '../ScrollArea'
import useScrollOpacity from '../../hooks/useScrollOpacity'

interface ContentWrapperProps {
    children: React.ReactNode
    contentRef?: React.RefObject<HTMLElement>
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ contentRef, children }) => {
    const { setOpacity } = useScrollOpacity()
    const scrollAreaRef = useRef(null)

    const { scrollYProgress } = useScroll({
        // FROM - start of 'target' 64px away from start of 'container' (bottom of header)
        // TO - start of 'target' 0px away from start of 'container' (top of header)
        target: contentRef,
        container: scrollAreaRef,
        offset: ['start 64px', 'start 0px'],
    })

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (value) => setOpacity(value))
        return () => unsubscribe()
    })

    return (
        <>
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
