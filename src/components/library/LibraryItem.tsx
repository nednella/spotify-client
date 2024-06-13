import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface LibraryItemProps {
    image: string
    title: string
    type: string
    author: string
    active?: boolean
    href: string
}

const LibraryItem: React.FC<LibraryItemProps> = ({ image, title, type, author, active, href }) => {
    const navigate = useNavigate()

    function toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    return (
        <div
            onClick={() => navigate(href)}
            className={twMerge(
                `
                    flex
                    cursor-pointer
                    select-none
                    gap-x-2
                    rounded-md
                    p-2
                    transition
                    hover:bg-neutral-700/50
                `,
                active && 'bg-neutral-700/80 hover:bg-neutral-700'
            )}
        >
            <div className="">
                <img
                    className={twMerge(
                        'max-h-12 min-h-12 min-w-12 max-w-12 rounded-md',
                        type === 'artist' && 'rounded-full'
                    )}
                    src={image}
                    alt=""
                />
            </div>
            <div className="flex flex-grow flex-col justify-center overflow-hidden">
                <div className="truncate font-medium">{title}</div>
                <div className="truncate text-sm font-medium text-neutral-400">
                    {toTitleCase(type)}
                    {type !== 'artist' && ' \u2022 ' + author}
                </div>
            </div>
        </div>
    )
}

export default LibraryItem
