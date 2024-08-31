import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import { useLibrary } from '../../../hooks/useLibrary'
import useGetPlaylist from '../../../hooks/useGetPlaylist'

import { PlaylistTrack } from '../../../types/Track'

import { generateRandomColour } from '../../../common/generateRandomColour'

import Loading from '../Loading'
import NotFound from '../NotFound'

import PlaylistWrapper from './components/PlaylistWrapper'
import ActionBar from '../../../components/ActionBar'
import TrackList from '../../../components/tracks/TrackList'
import TrackSearch from './components/TrackSearch'
import Footer from '../../../components/Footer'

const Playlist = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { id } = useParams()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const { data: playlistData, isLoading: playlistLoading, isError: playlistError } = useGetPlaylist(user, id)

    useEffect(() => {
        setColour(generateRandomColour())
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
                isUserCreated={playlistData.isUserCreated}
                count={playlistData.tracks.length}
                duration={playlistData.tracks.reduce((n: number, { track }: PlaylistTrack) => n + track.duration_ms, 0)}
            >
                <ActionBar
                    library={libraryData.playlists}
                    content={playlistData.playlist}
                    isUserCreated={playlistData.isUserCreated}
                />
                <TrackList
                    tracks={playlistData.tracks}
                    header
                    sticky
                    displayAlbum
                    displayAdded
                    isUserCreated={playlistData.isUserCreated}
                />
                {playlistData.isUserCreated && <TrackSearch isPlaylistEmpty={playlistData.tracks.length === 0} />}
                <Footer />
            </PlaylistWrapper>
        )
    )
}

export default Playlist
