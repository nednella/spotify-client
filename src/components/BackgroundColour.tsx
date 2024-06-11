import React from 'react'

interface BackgroundColourProps {
    opacity?: string
    colour?: string
}

// Renders behind an element and provides responsive fade-in/out colour
// Parent element must be relatively/absolutely positioned
const BackgroundColour: React.FC<BackgroundColourProps> = ({ opacity, colour }) => {
    return (
        <div
            className="absolute z-[-1] h-full w-full"
            style={{
                opacity: opacity || 0,
                backgroundColor: `rgba(${colour || '23, 23, 23'})`,
                backgroundImage: colour
                    ? `linear-gradient(rgba(0, 0, 0, .2) 0, rgba(0, 0, 0, .2) 100%)`
                    : '',
                transition: 'opacity .7s ease',
            }}
        ></div>
    )
}

export default BackgroundColour
