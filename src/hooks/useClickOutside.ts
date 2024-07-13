import React, { useEffect } from 'react'

export const useClickOutside = (ref: React.RefObject<HTMLElement | undefined>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (!ref?.current?.contains(e.target as HTMLElement)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}
