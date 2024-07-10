import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useColour from '../../../hooks/useColour.tsx'
import { useAuth } from '../../../hooks/useAuth.tsx'
import { useLibrary } from '../../../hooks/useLibrary.tsx'

import getPlaylist from '../../../api/playlist/getPlaylist.ts'

import Loading from '../Loading.tsx'
import NotFound from '../NotFound.tsx'

import PlaylistWrapper from './components/PlaylistWrapper.tsx'
import ActionBar from '../../../components/ActionBar.tsx'
import TrackList from '../../../components/songs/TrackList.tsx'
import Footer from '../../../components/Footer.tsx'

const Playlist = () => {
    const { setColour } = useColour()
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
        setColour(['86', '58', '204'])
    }, [setColour])

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
            >
                <ActionBar
                    user={user}
                    library={libraryData.playlists}
                    content={playlistData.playlist}
                />
                <TrackList
                    tracks={playlistData.tracks}
                    header={true}
                    sticky={true}
                    displayAlbum={true}
                    displayAdded={true}
                />
                <Footer />
            </PlaylistWrapper>
        )
    )
}

export default Playlist
