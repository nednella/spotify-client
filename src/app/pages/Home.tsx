import { twMerge } from 'tailwind-merge'

import Header from '../../components/Header'
import HeaderPlaylistItem from '../../components/HeaderPlaylistItem'

const Home = () => {
    const user = true

    return (
        <>
            <Header className={twMerge('', user && 'bg-gradient-to-b from-pink-800/50')}>
                {user ? (
                    <>
                        <h1 className="text-3xl font-semibold text-white">Welcome back, user</h1>
                        <h3>[Additional Nav Buttons]</h3>
                        <div
                            className="
                                mt-4
                                grid
                                grid-cols-1
                                gap-3
                                sm:grid-cols-2
                                xl:grid-cols-3
                                2xl:grid-cols-4
                            "
                        >
                            <HeaderPlaylistItem
                                image="/src/assets/images/mac.png"
                                name="Liked Songs"
                                href="/playlist/api-call-for-playlist-data"
                            />
                            <HeaderPlaylistItem
                                image=""
                                name="Recent Playlist B"
                                href="/playlist/api-call-for-playlist-data"
                            />
                            <HeaderPlaylistItem
                                image="/src/assets/images/liked.png"
                                name="Recent Playlist C"
                                href="/playlist/api-call-for-playlist-data"
                            />
                            <HeaderPlaylistItem
                                image="/src/assets/images/liked.png"
                                name="Recent Playlist D"
                                href="/playlist/api-call-for-playlist-data"
                            />
                            <HeaderPlaylistItem
                                image="/src/assets/images/liked.png"
                                name="Recent Playlist E"
                                href="/playlist/api-call-for-playlist-data"
                            />
                            <HeaderPlaylistItem
                                image="/src/assets/images/liked.png"
                                name="Recent Playlist F"
                                href="/playlist/api-call-for-playlist-data"
                            />
                        </div>
                    </>
                ) : null}
            </Header>
            <div className="flex items-center justify-center">
                <h1 className="text-3xl font-semibold text-white">Home Page</h1>
            </div>
        </>
    )
}

export default Home
