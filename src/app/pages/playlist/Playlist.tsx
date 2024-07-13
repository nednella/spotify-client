import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import { useLibrary } from '../../../hooks/useLibrary'
import useGetPlaylist from '../../../hooks/useGetPlaylist'

import { PlaylistTrack } from '../../../types/Track'

import Loading from '../Loading'
import NotFound from '../NotFound'

import PlaylistWrapper from './components/PlaylistWrapper'
import ActionBar from '../../../components/ActionBar'
import TrackList from '../../../components/songs/TrackList'
import Footer from '../../../components/Footer'

const Playlist = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { id } = useParams()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const { data: playlistData, isLoading: playlistLoading, isError: playlistError } = useGetPlaylist(user, id)

    useEffect(() => {
        setColour(['86', '58', '204'])
    }, [setColour])

    const isLoading = libraryLoading || playlistLoading
    const isError = libraryError || playlistError

    if (!id) return <NotFound />

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
                count={playlistData.tracks.length}
                duration={playlistData.tracks.reduce((n: number, { track }: PlaylistTrack) => n + track.duration_ms, 0)}
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
