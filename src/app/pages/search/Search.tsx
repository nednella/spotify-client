import { useEffect } from 'react'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import useGetBrowseCategories from '../../../hooks/useGetBrowseCategories'

import Loading from '../Loading'
import NotFound from '../NotFound'

import SearchWrapper from './components/SearchWrapper'
import ContentSectionLoading from '../../../components/content/ContentSectionLoading'

const Search = () => {
    const { defaultColour, setColour } = useColour()
    const { user } = useAuth()
    const { data, isLoading, isError } = useGetBrowseCategories(user)

    useEffect(() => {
        setColour(defaultColour)
    }, [defaultColour, setColour])

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <NotFound />
    ) : (
        user &&
        data && (
            <SearchWrapper>
                <ContentSectionLoading />
                <ContentSectionLoading />
                <ContentSectionLoading />
                <ContentSectionLoading />
                <ContentSectionLoading />
            </SearchWrapper>
        )
    )
}

export default Search
