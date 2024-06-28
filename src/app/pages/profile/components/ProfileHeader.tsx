import React from 'react'

import HeaderSpacer from '../../../../components/HeaderSpacer'
import { User } from '../../../../types/User'

interface ProfileHeaderProps {
    user: User
    colour?: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, colour }) => {
    return (
        <div
            className="h-fit w-[full] pb-4 md:h-[280px]"
            style={{
                backgroundColor: `rgb(${colour})`,
                backgroundImage: 'linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
            }}
        >
            <HeaderSpacer className="md:hidden" />
            {/* Heading content */}
            <section
                className="
                            mx-auto
                            flex
                            h-full
                            max-w-[1400px]
                            select-none
                            flex-col
                            px-4
                            md:flex-row
                        "
            >
                {/* Image container */}
                <div
                    className="
                                mb-4
                                max-h-[288px]
                                min-h-[128px]
                                w-[40vw]
                                min-w-[128px]
                                max-w-[288px]
                                self-center
                                md:mb-0
                                md:mr-4
                                md:max-h-[128px]
                                md:max-w-[128px]
                                md:self-end
                            "
                >
                    {/* Image */}
                    <img
                        className="
                                    aspect-square
                                    rounded-full
                                    object-cover
                                "
                        src={user.images && user.images[1] ? user.images[1].url : '../src/assets/images/liked.png'}
                    />
                </div>
                {/* Details container */}
                <div
                    className="
                                flex
                                flex-col
                                gap-y-2
                                overflow-hidden
                                md:self-end
                            "
                >
                    {/* Details */}
                    <p className="hidden md:block">Profile</p>
                    <p
                        className="
                                    text-3xl
                                    font-bold
                                    md:text-5xl
                                    md:font-extrabold
                                "
                    >
                        {user.display_name}
                    </p>
                    <p className="text-sm font-normal">{user.followers.total} Followers</p>
                </div>
            </section>
        </div>
    )
}

export default ProfileHeader
