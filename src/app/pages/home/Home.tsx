import { twMerge } from 'tailwind-merge'

import { useSession } from '../../../hooks/useSession'

import Header from '../../../components/Header'
import HeaderItem from './components/HeaderItem'

const Home = () => {
    const { session } = useSession()

    return (
        <>
            <Header className={twMerge('', session && 'bg-gradient-to-b from-pink-800/50')}>
                {session ? (
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
                                xl:grid-cols-4
                            "
                        >
                            <HeaderItem
                                image={'/src/assets/images/mac.png'}
                                title={'Liked Songs sdfsdfsdfsdfsfsfsfsfhjghjhgj'}
                                href={''}
                            />
                            <HeaderItem
                                image=""
                                title={'Recent Playlist B'}
                                href={''}
                            />
                            <HeaderItem
                                image={'/src/assets/images/liked.png'}
                                title={'Recent Playlist C'}
                                href={''}
                            />
                            <HeaderItem
                                image={'/src/assets/images/liked.png'}
                                title={'Recent Playlist D'}
                                href={''}
                            />
                            <HeaderItem
                                image={'/src/assets/images/liked.png'}
                                title={'Recent Playlist E'}
                                href={''}
                            />
                            <HeaderItem
                                image={'/src/assets/images/liked.png'}
                                title={'Recent Playlist F'}
                                href={''}
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
