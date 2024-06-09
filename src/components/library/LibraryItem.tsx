import { useNavigate } from 'react-router-dom'

interface LibraryItemProps {
    image: string
    title: string
    author: string
    href: string
}

const LibraryItem: React.FC<LibraryItemProps> = ({ image, title, author, href }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(href)}
            className="
                flex
                cursor-pointer
                gap-x-2
                rounded-md
                p-2
                transition
                hover:bg-neutral-800
            "
        >
            <div className="">
                <img
                    className="max-h-12 min-h-12 min-w-12 max-w-12 rounded-md"
                    src={image}
                    alt=""
                />
            </div>
            <div className="flex flex-grow flex-col justify-center overflow-hidden">
                <div className="truncate font-medium">{title}</div>
                <div className="truncate text-sm font-medium text-neutral-400">{author}</div>
            </div>
        </div>
    )
}

export default LibraryItem
