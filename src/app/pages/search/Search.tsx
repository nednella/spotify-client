import { useEffect } from 'react'

import useColour from '../../../hooks/useColour'
import { useAuth } from '../../../hooks/useAuth'
import useGetBrowseCategories from '../../../hooks/useGetBrowseCategories'

import Loading from '../Loading'
import NotFound from '../NotFound'

import SearchWrapper from './components/SearchWrapper'
import BrowseCategories from './components/BrowseCategories'
import Footer from '../../../components/Footer'

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
                <BrowseCategories categories={data} />
                <Footer />
            </SearchWrapper>
        )
    )
}

export default Search
