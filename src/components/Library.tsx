import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist
                        size={26}
                        className="text-neutral-400"
                    />
                    <p className="text-md font-medium text-neutral-400">Your Library</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 px-5">
                <p>Library Components</p>
            </div>
        </div>
    )
}

export default Library
