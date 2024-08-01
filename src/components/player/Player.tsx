import { useAuth } from '../../hooks/useAuth'

import PlayerContainer from './PlayerContainer'
import Banner from './Banner'

const Player = () => {
    const { user } = useAuth()

    return (
        <PlayerContainer>
            {!user ? (
                <Banner />
            ) : (
                <div className="flex h-full">
                    <div className="flex-1">Media</div>
                    <div className="flex-1">Controls</div>
                    <div className="flex-1">Buttons</div>
                </div>
            )}
        </PlayerContainer>
    )
}

export default Player
