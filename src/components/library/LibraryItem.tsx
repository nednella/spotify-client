import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { FiVolume2 } from 'react-icons/fi'

import { toTitleCase } from '../../common/toTitleCase'

interface LibraryItemProps {
    image: string
    title: string
    type: string
    author: string
    playing?: boolean
    selected?: boolean
    href: string
}

const LibraryItem: React.FC<LibraryItemProps> = ({ image, title, type, author, playing, selected, href }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(href)}
            className={twMerge(
                `
                    flex
                    cursor-pointer
                    select-none
                    items-center
                    gap-x-2
                    rounded-md
                    p-2
                    transition
                    hover:bg-neutral-700/50
                `,
                selected && 'bg-neutral-700/80 hover:bg-neutral-700'
            )}
        >
            <img
                className={twMerge(
                    'max-h-12 min-h-12 min-w-12 max-w-12 rounded-md',
                    type === 'artist' && 'rounded-full'
                )}
                src={image}
                alt=""
            />
            <div className="flex flex-grow flex-col justify-center overflow-hidden">
                <div className={twMerge('truncate font-medium', playing && 'text-green-500')}>{title}</div>
                <div className="truncate text-sm font-medium text-neutral-400">
                    {toTitleCase(type)}
                    {type !== 'artist' && ' \u2022 ' + author}
                </div>
            </div>
            {playing && (
                <FiVolume2
                    className="shrink-0 text-green-500"
                    size={20}
                />
            )}
        </div>
    )
}

export default LibraryItem
