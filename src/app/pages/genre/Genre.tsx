import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import useGetGenre from '../../../hooks/useGetGenre'

import { SimplifiedPlaylist } from '../../../types/Playlist'

import Loading from '../Loading'
import NotFound from '../NotFound'

import GenreWrapper from './components/GenreWrapper'
import ContentSection from '../../../components/content/ContentSection'
import ContentCard from '../../../components/content/ContentCard'

const Genre = () => {
    const { setColour } = useColour()
    const { user } = useAuth()
    const { id } = useParams()
    const { data, isLoading, isError } = useGetGenre(user, id)

    useEffect(() => {
        setColour(['255', '220', '220'])
    }, [setColour])

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        data && (
            <GenreWrapper genre={data.name}>
                <ContentSection>
                    {data.playlists.map((playlist: SimplifiedPlaylist) => (
                        <ContentCard
                            key={playlist.id}
                            id={playlist.id}
                            image={
                                playlist.images && playlist.images[0]
                                    ? playlist.images[0].url
                                    : '../src/assets/images/liked.png'
                            }
                            title={playlist.name}
                            subtitle={playlist.description}
                            href={`/${playlist.type}/${playlist.id}`}
                        />
                    ))}
                </ContentSection>
            </GenreWrapper>
        )
    )
}

export default Genre
