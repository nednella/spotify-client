import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '../../hooks/useAuth'
import getArtist from '../../api/artist/getArtist'

import Loading from './Loading'
import NotFound from './NotFound'
import PageWrapper from '../../components/content/PageWrapper'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Artist = () => {
    const { user } = useAuth()
    const { id: artist_id } = useParams()
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    useEffect(() => {
        setColour('16, 88, 184')
    }, [])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['artist', artist_id],
        queryFn: async () => getArtist(artist_id),
        enabled: user !== null,
    })

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        data && (
            <PageWrapper
                contentType="artist"
                colour={colour}
            >
                <p>Test! {artist_id}</p>
                <ContentSectionLoading />
            </PageWrapper>
        )
    )
}

export default Artist
