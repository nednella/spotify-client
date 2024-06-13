import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import React from 'react'

interface LibraryHeaderProps {
    fns: (() => void)[]
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({ fns: [createPlaylist] }) => {
    return (
        <>
            <div
                className="
                    sticky
                    top-0
                    flex
                    select-none
                    items-center
                    justify-between
                    bg-neutral-900
                    px-5
                    py-4
                "
            >
                <div className="inline-flex items-center gap-x-4">
                    <TbPlaylist
                        size={26}
                        className="text-neutral-400"
                    />
                    <p className="text-md font-medium text-neutral-400">My Library</p>
                </div>
                <AiOutlinePlus
                    onClick={createPlaylist}
                    size={20}
                    className="cursor-pointer text-neutral-400 hover:text-white"
                />
            </div>
        </>
    )
}

export default LibraryHeader
