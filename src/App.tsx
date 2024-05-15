import { Route, Routes } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import Search from './pages/Search'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

const App = () => {
    const routes = [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/search',
            element: <Search />,
        },
        {
            path: '/account',
            element: <Account />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return (
        <div className="flex h-full">
            <Sidebar />
            <Routes>
                {routes.map((route) => (
                    <Route {...route} />
                ))}
            </Routes>
        </div>
    )
}

export default App
