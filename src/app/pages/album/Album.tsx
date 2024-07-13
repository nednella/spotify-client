import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useColour from '../../../hooks/useColour.tsx'
import { useAuth } from '../../../hooks/useAuth.tsx'
import { useLibrary } from '../../../hooks/useLibrary.tsx'
import useGetAlbum from '../../../hooks/useGetAlbum.tsx'

import Loading from '../Loading'
import NotFound from '../NotFound'

import AlbumWrapper from './components/AlbumWrapper.tsx'
import ActionBar from '../../../components/ActionBar.tsx'
import TrackList from '../../../components/songs/TrackList.tsx'
import Footer from '../../../components/Footer.tsx'

const Album = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { id } = useParams()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const { data: albumData, isLoading: albumLoading, isError: albumError } = useGetAlbum(user, id)

    useEffect(() => {
        setColour(['86', '58', '204'])
    }, [setColour])

    const isLoading = libraryLoading || albumLoading
    const isError = libraryError || albumError

    if (!id) return <NotFound />

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData &&
        albumData && (
            <AlbumWrapper album={albumData.album}>
                <ActionBar
                    user={user}
                    library={libraryData.albums}
                    content={albumData.album}
                />
                <TrackList
                    tracks={albumData.album.tracks.items}
                    header={true}
                    sticky={true}
                />
                <Footer />
            </AlbumWrapper>
        )
    )
}

export default Album
