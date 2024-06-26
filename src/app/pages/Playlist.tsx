import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '../../hooks/useAuth.tsx'
import { useLibrary } from '../../hooks/useLibrary.tsx'

import getPlaylist from '../../api/playlist/getPlaylist.ts'

import Loading from './Loading'
import NotFound from './NotFound'

import PlaylistWrapper from '../../components/wrappers/PlaylistWrapper'
import ActionBar from '../../components/ActionBar.tsx'
import TrackList from '../../components/songs/TrackList.tsx'
import Footer from '../../components/Footer.tsx'

const Playlist = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format
    const { id: playlistId } = useParams()
    const { user } = useAuth()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const {
        data: playlistData,
        isLoading: playlistLoading,
        isError: playlistError,
    } = useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: async () => getPlaylist(playlistId),
        enabled: user !== null && playlistId !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })

    useEffect(() => {
        setColour('86, 58, 204')
    }, [])

    const isLoading = libraryLoading || playlistLoading
    const isError = libraryError || playlistError

    if (!playlistId) return <NotFound />

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData &&
        playlistData && (
            <PlaylistWrapper
                playlist={playlistData.playlist}
                tracks={playlistData.tracks}
                colour={colour}
            >
                <ActionBar
                    user={user}
                    library={libraryData.playlists}
                    content={playlistData.playlist}
                />
                <TrackList
                    songs={playlistData.tracks}
                    header={true}
                    sticky={true}
                    album={true}
                />
                <Footer />
            </PlaylistWrapper>
        )
    )
}

export default Playlist
