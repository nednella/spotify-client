import { useLocation } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

import SidebarItem from './SidebarNavItem'

const SidebarNav = () => {
    const location = useLocation()
    const routes = [
        {
            icon: HiHome,
            label: 'Home',
            active: location.pathname === '/',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: location.pathname === '/search',
            href: '/search',
        },
    ]
    return (
        <>
            {routes.map((route) => (
                <SidebarItem
                    key={route.label}
                    {...route}
                ></SidebarItem>
            ))}
        </>
    )
}

export default SidebarNav
