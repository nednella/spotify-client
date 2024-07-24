import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Button from '../../../../../components/Button'
import BackgroundColour from '../../../../../components/BackgroundColour'

const ResultsFilters = () => {
    const location = useLocation()

    const path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)

    return (
        <>
            <div className="sticky top-[64px] z-[1]">
                <BackgroundColour />
                <div className="px-4 py-2">
                    <FilterItem
                        to={''}
                        text={'All'}
                        active={path !== 'artists' && path !== 'albums' && path !== 'playlists' && path !== 'tracks'}
                    />
                    <FilterItem
                        to={'artists'}
                        text={'Artists'}
                        active={path === 'artists'}
                    />
                    <FilterItem
                        to={'albums'}
                        text={'Albums'}
                        active={path === 'albums'}
                    />
                    <FilterItem
                        to={'playlists'}
                        text={'Playlists'}
                        active={path === 'playlists'}
                    />
                    <FilterItem
                        to={'tracks'}
                        text={'Songs'}
                        active={path === 'tracks'}
                    />
                </div>
            </div>
        </>
    )
}

interface FilterItemProps {
    to: string
    text: string
    active: boolean
}

const FilterItem: React.FC<FilterItemProps> = ({ to, text, active }) => {
    return (
        <Link
            to={to}
            className="mr-3"
        >
            <Button
                data-active={active}
                className="
                    w-fit
                    bg-neutral-800
                    px-4
                    py-1
                    text-sm
                    text-white
                    hover:opacity-100
                    active:scale-100
                    data-[active=true]:bg-white
                    data-[active=true]:text-black
                "
            >
                {text}
            </Button>
        </Link>
    )
}

export default ResultsFilters
