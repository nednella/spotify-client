import { useEffect } from 'react'

import { useAuth } from '../../hooks/useAuth'
import usePlayer from '../../hooks/usePlayer'

import PlayerContainer from './PlayerContainer'
import Banner from './Banner'

import NowPlaying from './NowPlaying'
import PlayerControls from './PlayerControls'
import Devices from './Devices'

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
                <Banner />
            ) : (
                <footer className="flex h-full select-none">
                    <NowPlaying />
                    <PlayerControls />
                    <Devices />
                </footer>
            )}
        </PlayerContainer>
    )
}

export default Player
