import React, { useRef } from 'react'

import { User } from '../../types/User'

import useScrollOpacity from '../../hooks/useScrollOpacity'

import Header from '../Header'
import ScrollWrapper from './ScrollWrapper'
import HeaderSpacer from '../HeaderSpacer'
import BackgroundGradient from '../BackgroundGradient'

interface ProfileWrapperProps {
    user: User
    colour?: string
    children: React.ReactNode
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ user, colour, children }) => {
    const { opacity } = useScrollOpacity()
    const contentRef = useRef(null)

    return (
        <>
            <Header
                opacity={opacity}
                colour={colour}
            >
                <span className="truncate text-2xl font-bold">{user.display_name}</span>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                {/* Heading container */}
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
                                src={
                                    user.images && user.images[1]
                                        ? user.images[1].url
                                        : '../src/assets/images/liked.png'
                                }
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
                {/* Content container */}
                <div className="relative z-[1] h-fit w-full">
                    <BackgroundGradient
                        colour={colour}
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
