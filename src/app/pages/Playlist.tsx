import { useEffect, useState } from 'react'

import PlaylistWrapper from '../../components/wrappers/PlaylistWrapper'
import ContentSectionLoading from '../../components/content/ContentSectionLoading'

const Playlist = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    useEffect(() => {
        setColour('86, 58, 204')
    }, [])

    return (
        <>
            <PlaylistWrapper colour={colour}>
                {/* TODO: Playlist page content */}
                <ContentSectionLoading />
            </PlaylistWrapper>
        </>
    )
}

export default Playlist
