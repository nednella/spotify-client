import React from 'react'

import { useAuth } from '../../hooks/useAuth'
import useLoginModal from '../../hooks/useLoginModal'

import PlayButton from '../PlayButton'

interface RecentCardProps {
    uri: string
    image: string
    title: string
    href: string
}

const RecentCard: React.FC<RecentCardProps> = ({ uri, image, title }) => {
    const { user } = useAuth()
    const loginModal = useLoginModal()

    const onClick = () => {
        if (!user) {
            loginModal.setImg(image)
            loginModal.onOpen()
        }

        // TODO: navigate(href) -- href should be /type/uri (/album/123456, /playlist/789123)
    }

    return (
        <div
            onClick={onClick}
            className="
                group
                relative
                flex
                h-12
                items-center
                gap-x-2
                overflow-hidden
                rounded-md
                bg-neutral-400/10
                transition
                hover:bg-neutral-300/20
            "
        >
            <div
                className="
                    relative
                    max-h-12
                    max-w-12
                "
            >
                <img
                    className="object-cover"
                    src={image}
                    alt="Image"
                />
            </div>
            <div
                className="
                flex
                h-full
                flex-grow
                items-center
                justify-between
                overflow-hidden
                text-left
                "
            >
                <p
                    className="
                        truncate
                        text-wrap
                        text-sm
                        font-bold
                    "
                >
                    {title}
                </p>
                <PlayButton
                    contextUri={uri}
                    size={20}
                    className="
                        mr-2
                        scale-95
                        justify-center
                        p-2
                        opacity-0
                        group-hover:opacity-100
                    "
                />
            </div>
        </div>
    )
}

export default RecentCard
