import React from 'react'
import { Link } from 'react-router-dom'

interface BrowseCategoryProps {
    id: string
    name: string
    image: string
}

const BrowseCategory: React.FC<BrowseCategoryProps> = ({ id, name, image }) => {
    return (
        <div className="h-fit w-full ">
            <Link
                to={`/genre/${id}`}
                draggable={false}
            >
                <div className="group relative overflow-hidden rounded-md">
                    <img
                        src={image}
                        alt="Genre cover"
                    />
                    <span
                        className="
                            absolute
                            left-[50%]
                            top-[80%]
                            translate-x-[-50%]
                            translate-y-[-50%]
                            whitespace-nowrap
                            text-lg
                            font-bold
                        "
                    >
                        {name}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default BrowseCategory
