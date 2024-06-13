import { useEffect, useState } from 'react'

import AlbumWrapper from '../../components/content/AlbumWrapper.tsx'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Album = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    useEffect(() => {
        setColour('86, 58, 204')
    }, [])

    return (
        <>
            <AlbumWrapper colour={colour}>
                {/* TODO: Album page content */}
                <ContentSectionLoading />
            </AlbumWrapper>
        </>
    )
}

export default Album
