import React from 'react'
import useColour from '../hooks/useColour'

interface BackgroundColourProps {
    defaultClr?: boolean
    opacity?: number
    gradient?: boolean
}

// Renders behind an element and provides responsive fade-in/out colour
// Parent element must be relatively/absolutely positioned
const BackgroundColour: React.FC<BackgroundColourProps> = ({ defaultClr, opacity, gradient }) => {
    const { colour, defaultColour } = useColour()

    return (
        <div
            className="absolute z-[-1] h-full w-full"
            style={{
                opacity: opacity || 0,
                backgroundColor: defaultClr ? `rgb(${defaultColour})` : `rgb(${colour})`,
                backgroundImage: gradient ? `linear-gradient(rgba(0, 0, 0, .2) 0, rgba(0, 0, 0, .2) 100%)` : '',
                transition: 'opacity .7s ease',
            }}
        ></div>
    )
}

export default BackgroundColour
