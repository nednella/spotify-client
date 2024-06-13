import NoPlaylists from './NoPlaylists'
import NoPodcasts from './NoPodcasts'

const LibraryEmpty = () => {
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
                <NoPlaylists />
                <NoPodcasts />
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
