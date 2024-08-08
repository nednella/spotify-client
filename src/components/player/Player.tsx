import { useAuth } from '../../hooks/useAuth'

import PlayerContainer from './PlayerContainer'
import Banner from './Banner'
import NowPlaying from './NowPlaying'
import PlayerControls from './PlayerControls'
import Devices from './Devices'

const Player = () => {
    const { user } = useAuth()

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
