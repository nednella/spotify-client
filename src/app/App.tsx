import { Route, Routes } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

import Home from './pages/Home'
import Search from './pages/Search'
import Account from './pages/Account'
import Download from './pages/Download'
import Playlist from './pages/Playlist'
import Callback from './pages/Callback'
import NotFound from './pages/NotFound'

const App = () => {
    // TODO: protect routes
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
            element: <Account />,
        },
        {
            label: 'Download',
            path: '/download',
            element: <Download />,
        },
        {
            label: 'Playlist',
            path: '/playlist',
            element: <Playlist />,
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
