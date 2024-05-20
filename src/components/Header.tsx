import { useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome, HiSearch } from 'react-icons/hi'
import { TbPlaylist } from 'react-icons/tb'
import { FaUserAlt } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

import useLoginModal from '../hooks/useLoginModal'

import Button from './Button'
import React from 'react'

interface HeaderProps {
    children?: React.ReactNode
    className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const navigate = useNavigate()
    const location = useLocation()

    // TODO: authenticate user on button clicks -> if not logged in, redirect to fetch('/login')
    const user = true

    // TODO: add solid background colour to header block when page scrolls?

    // TODO: remove this! login button should fetch('/login') once implemented
    const loginModal = useLoginModal()

    return (
        <div className={twMerge('sticky top-0 h-fit p-4', className)}>
            <header
                className={twMerge(
                    'flex h-[32px] w-full items-center justify-between',
                    children && 'mb-4'
                )}
            >
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
                        onClick={() => navigate('/library')}
                        className="bg-white p-2"
                    >
                        <TbPlaylist size={20} />
                    </Button>
                    <Button
                        onClick={() => navigate('/home')}
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
                <div className="flex h-full items-center gap-x-4">
                    {user ? (
                        <>
                            <Button
                                onClick={() => navigate('/download')}
                                className="hidden h-full items-center gap-x-2 bg-black px-4 py-0 text-white md:flex"
                            >
                                <FiDownload />
                                <p>Install App</p>
                            </Button>
                            <Button
                                onClick={() => navigate('/account')}
                                className="border-none p-3"
                            >
                                <FaUserAlt size={14} />
                            </Button>
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
                                onClick={loginModal.onOpen}
                                className=" border-none px-6 py-2"
                            >
                                Log In
                            </Button>
                        </>
                    )}
                </div>
            </header>
            {children}
        </div>
    )
}

export default Header
