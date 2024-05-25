import React from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
    icon: IconType
    label: string
    active?: boolean
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href }) => {
    return (
        <Link
            to={href}
            className={twMerge(
                `
                    text-md
                    flex
                    h-auto
                    w-full
                    cursor-pointer
                    select-none
                    flex-row
                    items-center
                    gap-x-4
                    font-medium
                    text-neutral-400
                    transition
                `,
                active && 'text-white'
            )}
        >
            <Icon size={30} />
            <p className="w-full truncate">{label}</p>
        </Link>
    )
}

export default SidebarItem
