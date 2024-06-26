import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '../../hooks/useAuth.tsx'
import { useLibrary } from '../../hooks/useLibrary.tsx'

import getAlbum from '../../api/album/getAlbum.ts'

import Loading from './Loading'
import NotFound from './NotFound'

import AlbumWrapper from '../../components/wrappers/AlbumWrapper.tsx'
import ActionBar from '../../components/ActionBar.tsx'
import TrackList from '../../components/songs/TrackList.tsx'
import Footer from '../../components/Footer.tsx'

const Album = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format
    const { id: albumId } = useParams()
    const { user } = useAuth()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const {
        data: albumData,
        isLoading: albumLoading,
        isError: albumError,
    } = useQuery({
        queryKey: ['album', albumId],
        queryFn: async () => getAlbum(albumId),
        enabled: user !== null && albumId !== null,
        staleTime: 600000, // 1000 * 60 * 10 minutes
    })

    useEffect(() => {
        setColour('86, 58, 204')
    }, [])

    const isLoading = libraryLoading || albumLoading
    const isError = libraryError || albumError

    if (!albumId) return <NotFound />

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData &&
        albumData && (
            <AlbumWrapper
                album={albumData.album}
                colour={colour}
            >
                <ActionBar
                    user={user}
                    library={libraryData.albums}
                    content={albumData.album}
                />
                <TrackList
                    songs={albumData.album.tracks.items}
                    header={true}
                    sticky={true}
                    album={false}
                />
                <Footer />
            </AlbumWrapper>
        )
    )
}

export default Album
