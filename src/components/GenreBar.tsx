import React from 'react'

interface GenreBarProps {
    items: string[]
}

const GenreBar: React.FC<GenreBarProps> = ({ items }) => {
    return (
        <>
            <p className="mb-4 mt-2 select-none text-2xl font-bold">Genres</p>
            <div className="mb-8 flex h-fit flex-wrap gap-2">
                {items.map((item) => (
                    <>
                        <GenreItem
                            key={item}
                            genre={item}
                        />
                    </>
                ))}
            </div>
        </>
    )
}

export default GenreBar

interface GenreItemProps {
    genre: string
}
const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
    function toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    return (
        <div
            className="
                w-fit
                select-none
                rounded-full
                border
                border-neutral-500
                px-5
                py-1
                text-sm
                font-medium
                text-white
            "
        >
            {toTitleCase(genre)}
        </div>
    )
}
