import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import useColour from '../../../hooks/useColour'

import Browse from './browse/Browse'
import Results from './results/Results'

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
            </Routes>
        </SearchWrapper>
    )
}

export default Search
