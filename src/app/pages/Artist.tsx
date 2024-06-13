import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '../../hooks/useAuth'
import getArtist from '../../api/artist/getArtist'

import Loading from './Loading'
import NotFound from './NotFound'
import ArtistWrapper from '../../components/content/ArtistWrapper'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Artist = () => {
    const { user } = useAuth()
    const { id: artist_id } = useParams()
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    const { data, isLoading, isError } = useQuery({
        queryKey: ['artist', artist_id],
        queryFn: async () => getArtist(artist_id),
        enabled: user !== null,
    })

    if (data) {
        console.log(data)
    }

    useEffect(() => {
        setColour('16, 88, 114')
        // setColour('6, 95, 70')
        // setColour('150, 23, 23')
        // setColour('240, 144, 184')
        // setColour('250,230,250')
        // setColour('29, 185, 84')
    }, [data])

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        data && (
            <ArtistWrapper
                artist={data.artist}
                colour={colour}
            >
                {/* TODO: Artist page content */}
                <ContentSectionLoading />
            </ArtistWrapper>
        )
    )
}

export default Artist
