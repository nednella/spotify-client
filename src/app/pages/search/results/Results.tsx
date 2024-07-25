import { Route, Routes, useParams } from 'react-router-dom'

import useGetSearch from '../../../../hooks/useGetSearch'
import { useLibrary } from '../../../../hooks/useLibrary'

import Loading from '../Loading'
import NotFound from '../NotFound'

import ResultsFilters from './components/ResultsFilters'
import All from './all/All'

import Albums from './albums/Albums'
import Artists from './artists/Artists'
import Playlists from './playlists/Playlists'
import Tracks from './tracks/Tracks'

const Results = () => {
    const { query } = useParams()
    const { data, isLoading: isSearchLoading, isError } = useGetSearch(query)
    const { isLoading: isLibraryLoading } = useLibrary()

    const isLoading = isSearchLoading || isLibraryLoading

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        data && (
            <>
                <ResultsFilters />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <All
                                query={query}
                                data={data}
                            />
                        }
                    />
                    <Route
                        path="/albums"
                        element={
                            <Albums
                                query={query}
                                albums={data.albums}
                            />
                        }
                    />
                    <Route
                        path="/artists"
                        element={
                            <Artists
                                query={query}
                                artists={data.artists}
                            />
                        }
                    />
                    <Route
                        path="/playlists"
                        element={
                            <Playlists
                                query={query}
                                playlists={data.playlists}
                            />
                        }
                    />
                    <Route
                        path="/tracks"
                        element={
                            <Tracks
                                query={query}
                                tracks={data.tracks}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </>
        )
    )
}

export default Results
