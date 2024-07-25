import React, { useRef } from 'react'

import Header from '../../../../components/Header'
import SearchBar from './SearchBar'
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
                <SearchBar />
            </Header>
            <ScrollWrapper contentRef={contentRef}>
                <HeaderSpacer />

                {/* Content container */}
                <section
                    ref={contentRef}
                    className="mx-auto h-fit w-full max-w-[1400px]"
                >
                    {children}
                </section>
            </ScrollWrapper>
        </>
    )
}

export default SearchWrapper
