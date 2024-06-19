import { useEffect, useState } from 'react'

import { useAuth } from '../../hooks/useAuth'

import ProfileWrapper from '../../components/wrappers/ProfileWrapper'
import ContentSectionLoading from '../../components/content/ContentSectionLoading'

const Profile = () => {
    const { user } = useAuth()
    const [colour, setColour] = useState<string | undefined>(undefined) // accepts 'r/g/b' format

    // TODO: import user library information (user-created playlists)
    // TODO: useQuery user's top artists and tracks in the last 4 weeks

    useEffect(() => {
        setColour('16, 88, 184')
    }, [])

    return (
        <>
            {user && (
                <ProfileWrapper
                    user={user}
                    colour={colour}
                >
                    {/* TODO: Profile page content */}
                    <ContentSectionLoading />
                    <ContentSectionLoading />
                    <ContentSectionLoading />
                    <ContentSectionLoading />
                    <ContentSectionLoading />
                </ProfileWrapper>
            )}
        </>
    )
}

export default Profile
