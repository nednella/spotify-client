import { useEffect } from 'react'

import usePlayer from '../../hooks/usePlayer'

import { convertTrackDuration } from '../../common/convertTrackDuration'

import Slider from '../Slider'

const Seeker = () => {
    const player = usePlayer()
    const playerState = player.playerState

    useEffect(() => {
        const progress = setInterval(() => {
            if (!playerState?.paused) {
                player.updatePlayerPos(playerState?.position + 1000)
            }
        }, 1000)

        return () => clearInterval(progress)
    }, [player, playerState])

    return (
        <div className="flex items-center justify-center gap-x-2 text-sm text-neutral-300">
            <span className="w-10 text-nowrap text-right">{convertTrackDuration(playerState?.position) || '-:--'}</span>
            <Slider
                defaultValue={0}
                value={playerState?.position / playerState?.duration}
                thumb
                onChange={(v) => player.updatePlayerPos(v * playerState?.duration)}
                onCommit={(v) => player.seek(v * playerState?.duration)}
                disabled={playerState?.disallows.seeking}
                className="w-full max-w-[600px]"
            />
            <span className="w-10 text-nowrap">{convertTrackDuration(playerState?.duration) || '-:--'}</span>
        </div>
    )
}

export default Seeker
