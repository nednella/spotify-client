import React, { useRef } from 'react'

import Header from '../../../../components/Header'
import ScrollWrapper from '../../../../components/wrappers/ScrollWrapper'
import HeaderSpacer from '../../../../components/HeaderSpacer'

interface SearchWrapperProps {
    children: React.ReactNode
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ children }) => {
    const contentRef = useRef(null)

    return (
        <>
            <Header forceDisplayChildren={true}>
                <p>Search Bar</p>
            </Header>
            <ScrollWrapper contentRef={contentRef}>
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
            </ScrollWrapper>
        </>
    )
}

export default SearchWrapper
