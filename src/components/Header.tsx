import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome, HiSearch } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

import Login from '../api/Login'
import Logout from '../api/Logout'
import { useSession } from '../hooks/useSession'

import Button from './Button'
import toast from 'react-hot-toast'

interface HeaderProps {
    children?: React.ReactNode
    className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { session, setSession } = useSession()

    // TODO: add solid background colour to header block when page scrolls?

    const handleLogout = () => {
        Logout()
            .then(() => {
                navigate('/')
                setSession(false) // prevents requiring a page reload
            })
            .catch((error) => {
                toast.error(error.message)
                return navigate('/')
            })
    }

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
                <div className="flex h-full items-center gap-x-4">
                    {session ? (
                        <>
                            <Button
                                onClick={() => navigate('/download')}
                                className="hidden h-full items-center gap-x-2 bg-black px-4 py-0 text-white xsm:flex"
                            >
                                <FiDownload />
                                <p>Install App</p>
                            </Button>
                            <Button
                                onClick={handleLogout}
                                className="h-full bg-white px-4 py-0"
                            >
                                <p>Logout</p>
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
                                onClick={Login}
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
