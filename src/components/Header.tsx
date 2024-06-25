import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome, HiSearch } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'

import Login from '../api/auth/Login'
import { useAuth } from '../hooks/useAuth'

import BackgroundColour from './BackgroundColour'
import Button from './Button'
import AccountMenu from './menus/AccountMenu'

interface HeaderProps {
    className?: string
    opacity?: number
    colour?: string
}

const Header: React.FC<HeaderProps> = ({ className, opacity, colour }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className={twMerge('absolute top-0 z-50 h-[64px] w-full', className)}>
            <BackgroundColour
                colour={colour}
                opacity={opacity}
                gradient={true}
            />
            {/* Header container */}
            <div className="mx-auto h-[32px] max-w-[1400px]">
                {/* Header content */}
                <header className="m-4 flex select-none items-center justify-between">
                    {/* {Router Buttons} */}
                    <div className="hidden h-full gap-x-2 md:flex">
                        <Button
                            onClick={() => navigate(-1)}
                            disabled={location.key === 'default'}
                            className="flex items-center justify-center bg-black p-0 text-white disabled:opacity-50"
                        >
                            <RxCaretLeft size={32} />
                        </Button>
                        <Button
                            onClick={() => navigate(1)}
                            disabled={location.key === 'default'}
                            className="flex items-center justify-center bg-black p-0 text-white disabled:opacity-50"
                        >
                            <RxCaretRight size={32} />
                        </Button>
                    </div>
                    {/* {Mobile Buttons} */}
                    <div className="flex gap-x-4 md:hidden">
                        <Button
                            onClick={() => navigate('/')}
                            className="bg-white p-2"
                        >
                            <HiHome size={20} />
                        </Button>
                        <Button
                            onClick={() => navigate('/search')}
                            className="bg-white p-2"
                        >
                            <HiSearch size={20} />
                        </Button>
                    </div>
                    {/* {Account Buttons} */}
                    <div className="flex h-full items-center gap-x-2">
                        {user ? (
                            <>
                                <Button
                                    onClick={() => navigate('/download')}
                                    className="hidden h-full items-center gap-x-2 bg-black px-4 py-0 text-white md:flex"
                                >
                                    <FiDownload />
                                    <p>Install App</p>
                                </Button>
                                <AccountMenu>
                                    <Button className="relative border-none bg-black p-1">
                                        <img
                                            className="size-6 rounded-full object-cover"
                                            src={user?.images[0].url || 'src/assets/images/liked.png'}
                                            alt=""
                                        />
                                    </Button>
                                </AccountMenu>
                            </>
                        ) : (
                            <>
                                <a
                                    className="text-nowrap font-medium text-neutral-300 transition hover:opacity-75 active:scale-95"
                                    href="https://spotify.com/signup"
                                    rel="noreferrer"
                                >
                                    Sign Up
                                </a>

                                <Button
                                    onClick={Login}
                                    className="ml-2 border-none px-6 py-2"
                                >
                                    Log In
                                </Button>
                            </>
                        )}
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header
