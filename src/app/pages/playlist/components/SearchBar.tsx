import React, { useRef } from 'react'
import { debounce } from 'lodash'

import { BiSearch } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

interface SearchBarProps {
    setQuery: (value: string) => void
}
const SearchBar: React.FC<SearchBarProps> = ({ setQuery }) => {
    const searchRef = useRef<HTMLInputElement>(null)

    const handleQueryClear = () => {
        if (searchRef.current) {
            searchRef.current.value = ''
            setQuery('')
        }
    }

    const debounceSetQuery = debounce((v) => setQuery(v), 400)

    return (
        <div className="relative flex w-full">
            <BiSearch
                className="absolute left-3 top-[50%] translate-y-[-50%]"
                size={20}
            />
            <input
                ref={searchRef}
                className="h-[40px] w-full rounded-[4px] bg-neutral-800 px-10 py-2 text-sm outline-none"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="Search for some tracks"
                onChange={(e) => debounceSetQuery(e.target.value)}
                autoFocus
            />
            <IoMdClose
                onClick={handleQueryClear}
                className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                size={20}
            />
        </div>
    )
}

export default SearchBar
