import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface AccountMenuProps {
    children: React.ReactNode
}

const AccountMenu: React.FC<AccountMenuProps> = ({ children }) => {
    const navigate = useNavigate()
    const { Logout } = useAuth()

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className="outline-none"
                asChild
            >
                {children}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align={'end'}
                    sideOffset={5}
                    className="
                        relative
                        z-50
                        h-fit
                        max-h-full
                        w-[180px]
                        rounded-sm
                        bg-neutral-800
                        p-1
                        shadow-lg
                        shadow-neutral-900
                        transition
                    "
                >
                    <DropdownMenu.Item className="outline-none">
                        <div
                            className="
                                flex
                                h-10
                                w-full
                                cursor-pointer
                                rounded-t-sm
                                pl-3
                                hover:bg-neutral-700
                            "
                            onClick={() => navigate('/profile')}
                        >
                            <button className="text-sm font-semibold text-neutral-200">Profile</button>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none">
                        <div
                            className="
                                flex
                                h-10
                                w-full
                                cursor-pointer
                                rounded-t-sm
                                pl-3
                                hover:bg-neutral-700
                            "
                            onClick={() => navigate('/account')}
                        >
                            <button className="text-sm font-semibold text-neutral-200">Account</button>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="m-[5px] h-[1px] bg-neutral-600" />
                    <DropdownMenu.Item className="outline-none">
                        <div
                            className="
                                flex
                                h-10
                                w-full
                                cursor-pointer
                                rounded-b-sm
                                pl-3
                                hover:bg-neutral-700
                            "
                            onClick={Logout}
                        >
                            <button className="text-sm font-semibold text-neutral-200">Log out</button>
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow
                        height={8}
                        width={12}
                        className="fill-neutral-800"
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default AccountMenu
