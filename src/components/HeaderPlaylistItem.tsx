import { FaPlay } from 'react-icons/fa'

import useLoginModal from '../hooks/useLoginModal'

interface HeaderPlaylistItemProps {
    image: string
    name: string
    href?: string
}

const HeaderPlaylistItem: React.FC<HeaderPlaylistItemProps> = ({ image, name }) => {
    // TODO: verify active session before allowing click
    const user = false

    const loginModal = useLoginModal()

    const onClick = () => {
        if (!user) {
            return loginModal.onOpen()
        }

        // TODO: router push link
        // add href to item props
    }

    return (
        <button
            onClick={onClick}
            className="
                group
                relative
                flex
                items-center
                gap-x-4
                overflow-hidden
                rounded-md
                bg-neutral-100/10
                pr-4
                transition
                hover:bg-neutral-100/20
            "
        >
            <div
                className="
                    relative
                    max-h-[64px]
                    max-w-[64px]
                "
            >
                <img
                    className="object-cover"
                    src={image}
                    alt="Image"
                />
            </div>
            <p className="truncate py-5 font-medium">{name}</p>
            <div
                className="
                    absolute
                    right-5
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-green-500
                    p-4
                    opacity-0
                    drop-shadow-md
                    transition
                    hover:scale-105
                    group-hover:opacity-100
                "
            >
                <FaPlay className="text-black" />
            </div>
        </button>
    )
}

export default HeaderPlaylistItem
