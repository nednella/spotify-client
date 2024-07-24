import { Route, Routes, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import Sidebar from '../components/sidebar/Sidebar'
import Content from '../components/Content'

import Home from './pages/Home'
import Search from './pages/search/Search'
import Genre from './pages/genre/Genre'
import Collection from './pages/collection/Collection'
import Playlist from './pages/playlist/Playlist'
import Album from './pages/album/Album'
import Artist from './pages/artist/Artist'
import Profile from './pages/profile/Profile'
import Account from './pages/Account'
import Download from './pages/Download'
import Callback from './pages/Callback'
import NotFound from './pages/NotFound'

const App = () => {
    const { user } = useAuth()

    const routes = [
        {
            label: 'Home',
            path: '/',
            element: <Home />,
        },
        {
            label: 'Search',
            path: '/search/*',
            element: user ? <Search /> : <Navigate to={'/'} />,
        },
        {
            label: 'Genre',
            path: '/genre/:id',
            element: user ? <Genre /> : <Navigate to={'/'} />,
        },
        {
            label: 'Collection',
            path: '/collection/:id',
            element: user ? <Collection /> : <Navigate to={'/'} />,
        },
        {
            label: 'Playlist',
            path: '/playlist/:id',
            element: user ? <Playlist /> : <Navigate to={'/'} />,
        },
        {
            label: 'Album',
            path: '/album/:id',
            element: user ? <Album /> : <Navigate to={'/'} />,
        },
        {
            label: 'Artist',
            path: '/artist/:id',
            element: user ? <Artist /> : <Navigate to={'/'} />,
        },
        {
            label: 'Profile',
            path: '/profile',
            element: user ? <Profile /> : <Navigate to={'/'} />,
        },
        {
            label: 'Account',
            path: '/account',
            element: user ? <Account /> : <Navigate to={'/'} />,
        },
        {
            label: 'Download',
            path: '/download',
            element: user ? <Download /> : <Navigate to={'/'} />,
        },
        {
            label: 'Callback',
            path: '/callback',
            element: <Callback />,
        },
        {
            label: 'Not Found',
            path: '*',
            element: <NotFound />,
        },
    ]

    return (
        <div className="flex h-full">
            <Sidebar />
            <Content>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.label}
                            {...route}
                        />
                    ))}
                </Routes>
            </Content>
        </div>
    )
}

export default App
