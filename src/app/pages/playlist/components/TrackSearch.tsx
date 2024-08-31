import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import useGetSearchTracks from '../../../../hooks/useGetSearchTracks'

import SearchBar from './SearchBar'
import TrackList from '../../../../components/tracks/TrackList'

interface TrackSearchProps {
    isPlaylistEmpty: boolean
}

const TrackSearch: React.FC<TrackSearchProps> = ({ isPlaylistEmpty }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const { data: searchResults, isError } = useGetSearchTracks(query)

    useEffect(() => {
        if (isPlaylistEmpty) setIsOpen(true)
    }, [isPlaylistEmpty])

    const handleClick = () => {
        if (isOpen) setIsOpen(false)
        else setIsOpen(true)
    }

    return isOpen ? (
        <>
            <div className="mt-6 select-none py-6">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-2xl font-bold">Let's find something for your playlist</span>
                        <SearchBar setQuery={setQuery} />
                    </div>
                    <button
                        onClick={handleClick}
                        className="mr-2"
                    >
                        <IoMdClose
                            size={32}
                            className="text-neutral-400"
                        />
                    </button>
                </div>
            </div>
            <div className="h-fit">
                {isError ? (
                    <span className="font-medium">Something went wrong, please try searching again.</span>
                ) : (
                    searchResults?.tracks && (
                        <TrackList
                            tracks={searchResults.tracks}
                            header={false}
                            displayAlbum
                            displayAddToPlaylist
                        />
                    )
                )}
            </div>
        </>
    ) : (
        <div className="my-8 ml-auto mr-4 w-fit">
            <button
                onClick={handleClick}
                className="font-bold"
            >
                Find more tracks
            </button>
        </div>
    )
}

export default TrackSearch
