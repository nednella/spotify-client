import { debounce } from 'lodash'
import { useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const debounceNavigate = debounce((e) => navigate(e.target.value, { replace: true }), 400)

    const onClear = () => {
        if (formRef.current) {
            formRef.current.reset()
            navigate('/search')
        }
    }

    return (
        <form
            ref={formRef}
            className="relative flex w-full max-w-[360px]"
            action=""
        >
            <BiSearch
                className="absolute left-3 top-[50%] translate-y-[-50%]"
                size={20}
            />
            <input
                className="h-[48px] w-full rounded-full bg-neutral-800 px-10 py-2 text-sm"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="What do you want to play?"
                onChange={(e) => debounceNavigate(e)}
                autoFocus
            />
            <IoMdClose
                onClick={onClear}
                className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                size={20}
            />
        </form>
    )
}

export default SearchBar
