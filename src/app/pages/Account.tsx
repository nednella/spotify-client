import { FaUserAlt } from 'react-icons/fa'

import { useAuth } from '../../hooks/useAuth'

import Container from '../../components/Container'
import Header from '../../components/Header'

const Account = () => {
    const { user } = useAuth()

    return (
        <>
            <Header />
            <div className="flex flex-grow justify-center">
                <div className="mx-4 mt-8 flex max-w-[600px] flex-grow flex-col gap-y-4">
                    <div className="flex flex-col gap-4 xsm:flex-row">
                        <Container
                            className="
                            h-32
                            rounded-md
                            bg-neutral-800
                            p-3
                        "
                        >
                            <p className="mb-2 text-xs font-normal">Your Plan</p>
                            <p className="pl-4 text-3xl font-bold text-pink-200/90">
                                {user?.product} user
                            </p>
                        </Container>
                        <a
                            href="https://spotify.com/account"
                            rel="noreferrer"
                            className="
                            flex
                            h-32
                            min-w-40
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            gap-y-2
                            rounded-md
                            bg-neutral-800
                            p-3
                        "
                        >
                            <FaUserAlt
                                className="text-neutral-300"
                                size={20}
                            />
                            <p className="text-center font-bold text-neutral-300">Your account</p>
                        </a>
                    </div>
                    <Container
                        className="
                        rounded-md
                        bg-neutral-800
                        p-3
                    "
                    >
                        <p className="mb-4 text-2xl font-bold">User Details</p>
                        <div className="pl-4">
                            <div>
                                <p className="text-xs font-medium text-neutral-400">Username</p>
                                <p className="mb-3 text-lg font-bold">{user?.id}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-400">
                                    Email address
                                </p>
                                <p className="mb-3 text-lg font-bold">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-400">Display name</p>
                                <p className="mb-3 text-lg font-bold">{user?.display_name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-neutral-400">Country</p>
                                <p className="text-lg font-bold">{user?.country}</p>
                            </div>
                        </div>
                    </Container>
                    <Container
                        className="
                        rounded-md
                        bg-neutral-800
                        p-3
                    "
                    >
                        <p className="mb-4 text-2xl font-bold">
                            If you'd like to revoke access to this app
                        </p>
                        <div className="pl-4">
                            <p className="mb-3 font-semibold text-neutral-400">
                                1. Click on "Your account" to redirect to the real Spotify account
                                settings page
                            </p>
                            <p className="mb-3 font-semibold text-neutral-400">
                                2. Go to the "Security and Privacy" section
                            </p>
                            <p className="mb-3 font-semibold text-neutral-400">
                                3. Go to "Manage apps"
                            </p>
                            <p className="mb-3 font-semibold text-neutral-400">
                                4. Find the item named "Spotify Web Player" by nednella and click
                                remove access
                            </p>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Account
