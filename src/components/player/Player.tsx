import { useEffect } from 'react'

import { useAuth } from '../../hooks/useAuth'
import usePlayer from '../../hooks/usePlayer'

import PlayerContainer from './PlayerContainer'
import SignedOutBanner from './SignedOutBanner'

import NowPlaying from './NowPlaying'
import PlayerControls from './PlayerControls'
import Devices from './Devices'
import ActiveDevice from './ActiveDevice'

const Player = () => {
    const { user } = useAuth()
    const initialisePlayer = usePlayer((state) => state.initialisePlayer)

    useEffect(() => {
        if (!user) return
        initialisePlayer(user.token)
    }, [user, initialisePlayer])

    return (
        <PlayerContainer>
            {!user ? (
                <SignedOutBanner />
            ) : (
                <footer
                    className="
                        flex
                        h-fit
                        select-none
                        flex-col
                    "
                >
                    <div className="flex h-[72px]">
                        <NowPlaying />
                        <PlayerControls />
                        <Devices />
                    </div>
                    <ActiveDevice />
                </footer>
            )}
        </PlayerContainer>
    )
}

export default Player
