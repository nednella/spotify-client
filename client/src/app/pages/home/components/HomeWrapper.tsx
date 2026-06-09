import React, { useRef } from 'react'

import Header from '../../../../components/Header'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import HeaderSpacer from '../../../../components/HeaderSpacer'
import BackgroundGradient from '../../../../components/BackgroundGradient'
import { useAuth } from '../../../../hooks/useAuth'

interface HomeWrapperProps {
    children: React.ReactNode
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
    const { user } = useAuth()
    const contentRef = useRef(null)

    return (
        <>
            <Header />
            <ScrollWrapper contentRef={contentRef}>
                <>
                    {/* Background gradient */}
                    {user && <BackgroundGradient size="large" />}

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
            </ScrollWrapper>
        </>
    )
}

export default HomeWrapper
