import { useEffect } from 'react'

import useColour from '../../../hooks/useColour.ts'
import { useAuth } from '../../../hooks/useAuth.tsx'
import { useLibrary } from '../../../hooks/useLibrary.tsx'

import { SavedTrack } from '../../../types/Track.ts'

import Loading from '../Loading.tsx'
import NotFound from '../NotFound.tsx'

import CollectionWrapper from './components/CollectionWrapper.tsx'
import TrackList from '../../../components/tracks/TrackList.tsx'
import Footer from '../../../components/Footer.tsx'
import CollectionActionBar from './components/CollectionActionBar.tsx'

const Collection = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { data: libraryData, isLoading, isError } = useLibrary()

    useEffect(() => {
        setColour(['86, 58, 204'])
    }, [setColour])

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData && (
            <CollectionWrapper
                count={libraryData.tracks.length}
                duration={libraryData.tracks.reduce((n: number, { track }: SavedTrack) => n + track.duration_ms, 0)}
            >
                <CollectionActionBar />
                <TrackList
                    tracks={libraryData.tracks}
                    header={true}
                    sticky={true}
                    displayAlbum={true}
                />
                <Footer />
            </CollectionWrapper>
        )
    )
}

export default Collection
