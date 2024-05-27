import React from 'react'

import Button from '../Button'
import Container from '../Container'

interface LibraryEmptyProps {
    fns: (() => void)[]
}

const LibraryEmpty: React.FC<LibraryEmptyProps> = ({ fns: [createPlaylist, searchPodcasts] }) => {
    return (
        <div
            className="
                flex
                h-full
                flex-grow
                flex-col
                justify-between
                gap-y-2
            "
        >
            <div className="flex flex-col gap-y-4">
                <Container className="select-none overflow-hidden bg-neutral-800 p-4">
                    <h3 className="textlg truncate font-bold">Create your first playlist</h3>
                    <p className="mt-2 text-sm font-semibold">It's easy, we'll help you</p>
                    <Button
                        onClick={createPlaylist}
                        className="mt-4 w-fit bg-white px-4 py-1"
                    >
                        Create playlist
                    </Button>
                </Container>
                <Container className="select-none overflow-hidden bg-neutral-800 p-4">
                    <h3 className="textlg truncate text-wrap font-bold">
                        Let's find some podcasts to follow
                    </h3>
                    <p className="mt-2 text-sm font-semibold">
                        We'll keep you updated on new episodes
                    </p>
                    <Button
                        onClick={searchPodcasts}
                        className="mt-4 w-fit bg-white px-4 py-1"
                    >
                        Browse podcasts
                    </Button>
                </Container>
            </div>

            <div
                className="
                    w-ful
                    h-fit
                    select-none
                    p-6
                    pb-12
                    text-xs
                    font-medium
                    text-neutral-400
                "
            >
                <div className="flex flex-wrap">
                    <p className="py-2 pr-3">Legal</p>
                    <p className="py-2 pr-3">Safety & Privacy Center</p>
                    <p className="py-2 pr-3">Privacy Policy</p>
                    <p className="py-2 pr-3">Cookie Settings</p>
                    <p className="py-2 pr-3">About Ads</p>
                    <p className="py-2 pr-3">Accessibility</p>
                    <p className="py-2 pr-3">Modern Slavery Act</p>
                    <p className="py-2 pr-3">UK Tax Policy</p>
                    <p className="py-2 pr-3">UK Gender Pay Report</p>
                </div>
                <p className="pt-2 text-sm">Cookies</p>
            </div>
        </div>
    )
}

export default LibraryEmpty
