import React from 'react'

import useColour from '../../../../hooks/useColour'

import HeaderSpacer from '../../../../components/HeaderSpacer'

interface ArtistHeaderProps {
    genre: string
}
const ArtistHeader: React.FC<ArtistHeaderProps> = ({ genre }) => {
    const { colour } = useColour()

    return (
        <div
            className="h-fit w-[full] pb-4 md:h-[280px]"
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
            }}
        >
            <HeaderSpacer className="md:hidden" />
            {/* Heading content */}
            <section
                className="
                    mx-auto
                    flex
                    h-full
                    max-w-[1400px]
                    select-none
                    flex-col
                    px-4
                    md:flex-row
                "
            >
                <span
                    className="
                        self-end
                        text-3xl
                        font-bold
                        md:text-5xl
                        md:font-extrabold
                    "
                >
                    {genre}
                </span>
            </section>
        </div>
    )
}

export default ArtistHeader
