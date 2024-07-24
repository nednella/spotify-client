import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import useColour from '../../../hooks/useColour'

import Browse from './browse/Browse'
import Results from './results/Results'
import NotFound from './NotFound'
import SearchWrapper from './components/SearchWrapper'

const Search = () => {
    const { defaultColour, setColour } = useColour()

    useEffect(() => {
        setColour(defaultColour)
    }, [defaultColour, setColour])

    return (
        <SearchWrapper>
            <Routes>
                <Route
                    index
                    element={<Browse />}
                />
                <Route
                    path="/:query/*"
                    element={<Results />}
                />
                <Route
                    path="/*"
                    element={<NotFound />}
                />
            </Routes>
        </SearchWrapper>
    )
}

export default Search
