import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import useScrollOpacity from '../../hooks/useScrollOpacity'
import { useAuth } from '../../hooks/useAuth'
import { useLibrary } from '../../hooks/useLibrary'
import getArtist from '../../api/artist/getArtist'

import Loading from './Loading'
import NotFound from './NotFound'
import ArtistWrapper from '../../components/wrappers/ArtistWrapper'
import BackgroundColour from '../../components/BackgroundColour'
import { TabMenu, TabItems, TabTrigger, TabContent } from '../../components/TabMenu'
import ActionBar from '../../components/ActionBar'
import TrackList from '../../components/playlist/TrackList'

import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Artist = () => {
    const { id: artistId } = useParams()
    const { opacity } = useScrollOpacity()
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    const { user } = useAuth()
    const { data: libraryData, isLoading: libraryLoading, isError: libraryError } = useLibrary()
    const {
        data: artistData,
        isLoading: artistLoading,
        isError: artistError,
    } = useQuery({
        queryKey: ['artist', artistId],
        queryFn: async () => getArtist(artistId),
        enabled: user !== null && artistId !== null,
    })

    useEffect(() => {
        setColour('56, 144, 176')
        // setColour('16, 88, 114')
        // setColour('6, 95, 70')
        // setColour('150, 23, 23')
        // setColour('240, 144, 184')
        // setColour('250,230,250')
        // setColour('29, 185, 84')
    }, [artistData])

    const isLoading = libraryLoading || artistLoading
    const isError = libraryError || artistError

    if (!artistId) return <NotFound />

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        libraryData &&
        artistData && (
            <ArtistWrapper
                artist={artistData.artist}
                colour={colour}
            >
                <TabMenu>
                    <TabItems className="sticky top-[64px]">
                        <BackgroundColour opacity={opacity} />
                        <div className="mx-auto max-w-[1400px]">
                            <TabTrigger
                                value="tab-1"
                                title="Home"
                            />
                            <TabTrigger
                                value="tab-2"
                                title="Albums"
                            />
                            <TabTrigger
                                value="tab-3"
                                title="Singles & EPs"
                            />
                            <TabTrigger
                                value="tab-4"
                                title="Compilations"
                            />
                        </div>
                    </TabItems>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-1"
                    >
                        <ActionBar
                            libraryData={libraryData.artists}
                            contentType="artist"
                            contentId={artistData.id}
                        />
                        <TrackList
                            songs={artistData.top_tracks}
                            header={false}
                            album={true}
                        />
                        <ContentSectionLoading />
                        <ContentSectionLoading />
                        <ContentSectionLoading />
                        <ContentSectionLoading />
                    </TabContent>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-2"
                    >
                        <p>Content 2</p>
                    </TabContent>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-3"
                    >
                        <p>Content 3</p>
                    </TabContent>
                    <TabContent
                        className="mx-auto max-w-[1400px]"
                        value="tab-4"
                    >
                        <p>Content 4</p>
                    </TabContent>
                </TabMenu>
            </ArtistWrapper>
        )
    )
}

export default Artist
