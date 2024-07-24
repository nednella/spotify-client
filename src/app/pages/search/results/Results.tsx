import { Route, Routes, useParams } from 'react-router-dom'

import useGetSearch from '../../../../hooks/useGetSearch'
import { useLibrary } from '../../../../hooks/useLibrary'

import Loading from '../Loading'
import NotFound from '../NotFound'

import ResultsFilters from './components/ResultsFilters'
import ContentContainer from '../../../../components/PageContentContainer'
import TrackList from '../../../../components/songs/TrackList'
import Footer from '../../../../components/Footer'

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
                            <ContentContainer>
                                <p>all</p>
                            </ContentContainer>
                        }
                    />
                    <Route
                        path="/artists"
                        element={
                            <ContentContainer>
                                <p>artists</p>
                            </ContentContainer>
                        }
                    />
                    <Route
                        path="/albums"
                        element={
                            <ContentContainer>
                                <p>albums</p>
                            </ContentContainer>
                        }
                    />
                    <Route
                        path="/playlists"
                        element={
                            <ContentContainer>
                                <p>playlists</p>
                            </ContentContainer>
                        }
                    />
                    <Route
                        path="/tracks"
                        element={
                            <ContentContainer>
                                <TrackList
                                    tracks={data.tracks}
                                    header
                                    sticky
                                    stickyHeight="110"
                                    displayAlbum
                                />
                                <Footer />
                            </ContentContainer>
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
