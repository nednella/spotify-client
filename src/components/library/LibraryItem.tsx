import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { toTitleCase } from '../../common/toTitleCase'

interface LibraryItemProps {
    image: string
    title: string
    type: string
    author: string
    isActive?: boolean
    isPlaying?: boolean
    isCurrentContext?: boolean
    href: string
}

const LibraryItem: React.FC<LibraryItemProps> = ({
    image,
    title,
    author,
    type,
    href,
    isActive,
    isPlaying,
    isCurrentContext,
}) => {
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
                isActive && 'bg-neutral-700/80 hover:bg-neutral-700'
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
                <div className={twMerge('truncate font-medium', isCurrentContext && 'text-green-500')}>{title}</div>
                <div className="truncate text-sm font-medium text-neutral-400">
                    {toTitleCase(type)}
                    {type !== 'artist' && ' \u2022 ' + author}
                </div>
            </div>
            {isPlaying && isCurrentContext && (
                <img
                    className="
                        size-4
                        max-h-4
                        max-w-4
                        group-hover:hidden
                        group-data-[selected=true]:hidden
                    "
                    src="../../src/assets/images/equaliser-animation.gif"
                    alt=""
                />
            )}
        </div>
    )
}

export default LibraryItem
