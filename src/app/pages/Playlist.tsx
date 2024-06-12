import Header from '../../components/Header'

const Playlist = () => {
    return (
        <>
            <Header />
            <main
                className="
                    flex
                    flex-grow
                    flex-col
                    bg-gradient-to-b
                    from-red-800
                    to-50vh
                "
            >
                {/* // Playlist info */}
                <div
                    className="
                        mb-4
                        mt-8
                        flex
                        flex-col
                        bg-transparent
                        px-4
                        md:flex-row
                    "
                >
                    <div
                        className="
                            mb-4
                            w-[50%]
                            min-w-[128px]
                            max-w-[240px]
                            self-center
                            md:mb-0
                            md:mr-4
                            md:max-h-[128px]
                            md:max-w-[128px]
                            md:self-end
                        "
                    >
                        <img
                            className="rounded-md object-cover"
                            src="src/assets/images/liked.png"
                            alt=""
                        />
                    </div>
                    <div
                        className="
                            flex
                            flex-col
                            gap-y-2
                            md:justify-end
                            md:gap-0
                        "
                    >
                        <span className="hidden truncate text-sm font-semibold md:block">Playlist</span>
                        <span className="truncate text-wrap text-4xl font-black">Chill House Summer 2024</span>
                        <span className="truncate text-wrap text-sm font-normal text-neutral-400">
                            Summer chill tracks to vibe or dance to in 2024. Updated weekly.
                        </span>
                        {/* // TODO: Misc. playlist info */}
                        <div className="">
                            <span>creation user - </span>
                            <span>song count - </span>
                            <span>approx. listening length</span>
                        </div>
                    </div>
                </div>

                {/* TODO: Music controls */}
                <div></div>

                {/* // Table */}
                <div className="bg-black/10 px-4">
                    {/* Table header */}
                    {/* TODO: apply the below classes to table header when table header is no longer within viewport */}
                    {/* className="absolute top-16 w-[calc(100%-32px)] */}
                    <div
                        className="
                            mb-2
                            hidden
                            h-[32px]
                            grid-cols-playlist-table
                            items-center
                            gap-x-4
                            border-b
                            border-white/50
                            px-4
                            text-white/50
                            md:grid
                        "
                    >
                        <span>#</span>
                        <span>Title</span>
                        <span>Album</span>
                        <span>Length</span>
                    </div>
                    {/* // Table body */}
                    <span className="px-4 md:grid md:grid-cols-playlist-table md:gap-x-4">
                        {/* // TODO: table row design - for mobile display SONG TITLE COLUMN ONLY */}
                        Table filled with PlaylistTableRow items
                    </span>
                </div>
            </main>
        </>
    )
}

export default Playlist
