import { Route, Routes, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import Sidebar from '../components/sidebar/Sidebar'
import Content from '../components/Content'

import Home from './pages/home/Home'
import Search from './pages/Search'
import Account from './pages/Account'
import Download from './pages/Download'
import Playlist from './pages/Playlist'
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
            path: '/search',
            element: <Search />,
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
            label: 'Playlist',
            path: '/playlist',
            element: user ? <Playlist /> : <Navigate to={'/'} />,
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
