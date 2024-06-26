import React, { useRef } from 'react'

import { useAuth } from '../../hooks/useAuth'
import useScrollOpacity from '../../hooks/useScrollOpacity'

import Header from '../Header'
import ScrollWrapper from './ScrollWrapper'
import HeaderSpacer from '../HeaderSpacer'
import BackgroundGradient from '../BackgroundGradient'
// import BackgroundColour from '../BackgroundColour'

interface HomeWrapperProps {
    colour?: string
    children: React.ReactNode
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ colour, children }) => {
    const { user } = useAuth()
    const { opacity } = useScrollOpacity()
    const contentRef = useRef(null)

    return (
        <>
            <Header
                opacity={opacity}
                colour={colour}
            />
            <ScrollWrapper contentRef={contentRef}>
                {user ? (
                    <>
                        {/* Background gradient */}
                        <BackgroundGradient
                            colour={colour}
                            size="large"
                        />

                        {/* Header spacer */}
                        <HeaderSpacer />

                        {/* Content container */}
                        <div className="relative z-[1] h-fit w-full">
                            {/* Content */}
                            <section
                                ref={contentRef}
                                className="mx-auto h-fit w-full max-w-[1400px] p-4"
                            >
                                {children}
                            </section>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Header spacer */}
                        <HeaderSpacer />

                        {/* Content container */}
                        <div className="relative z-[1] h-fit w-full">
                            {/* Content */}
                            <section
                                ref={contentRef}
                                className="mx-auto h-fit w-full max-w-[1400px] p-4"
                            >
                                {/* TODO: add "logged out" content */}
                                <p>You are logged out.</p>
                            </section>
                        </div>
                    </>
                )}
            </ScrollWrapper>
        </>
    )
}

export default HomeWrapper
