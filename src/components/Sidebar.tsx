import { useLocation } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

import Container from './Container'
import SidebarItem from './SidebarItem'
import Library from './Library'

const Sidebar = () => {
    const location = useLocation()

    const links = [
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
        <div className="hidden h-full w-[300px] flex-col gap-y-2 p-2 md:flex">
            <Container className="flex flex-col gap-y-4 px-6 py-4">
                {links.map((link) => (
                    <SidebarItem
                        key={link.label}
                        {...link}
                    ></SidebarItem>
                ))}
            </Container>
            <Container className="h-full overflow-y-auto">
                <Library />
            </Container>
        </div>
    )
}

export default Sidebar
