import React, { useRef } from 'react'

import { User } from '../../../../types/User'

import ProfileHeader from './ProfileHeader'
import Header from '../../../../components/Header'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import BackgroundGradient from '../../../../components/BackgroundGradient'

interface ProfileWrapperProps {
    user: User
    children: React.ReactNode
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ user, children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header>
                <span className="truncate text-2xl font-bold">{user.display_name}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <ProfileHeader user={user} />
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        className="z-[-1]"
                        size="large"
                    />
                    {/* Content */}
                    <section
                        ref={contentRef}
                        className="h-fit w-full"
                    >
                        {children}
                    </section>
                </div>
            </ScrollWrapper>
        </>
    )
}

export default ProfileWrapper
