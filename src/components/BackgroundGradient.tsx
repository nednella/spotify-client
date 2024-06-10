import React from 'react'

interface BackgroundGradientProps {
    colour: string
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ colour }) => {
    return (
        <div
            className="absolute top-0 h-[400px] w-full"
            style={{
                backgroundImage: `
                    linear-gradient(to bottom,
                    rgb(${colour}),
                    transparent)
                `,
            }}
        ></div>
    )
}

export default BackgroundGradient
