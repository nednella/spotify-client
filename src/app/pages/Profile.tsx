import { useEffect, useState } from 'react'

import PageWrapper from '../../components/content/PageWrapper'

import ContentSection from '../../components/homepage/ContentSection'
import ContentSectionLoading from '../../components/homepage/ContentSectionLoading'

const Profile = () => {
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    useEffect(() => {
        setColour('16, 88, 184')
    }, [])

    return (
        <>
            <PageWrapper
                contentType="profile"
                colour={colour}
            >
                <p>Test!</p>
                <ContentSection title="Content Title" />
                <ContentSectionLoading />
                <ContentSectionLoading />
                <ContentSectionLoading />
            </PageWrapper>
        </>
    )
}

export default Profile
