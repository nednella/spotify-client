import { useEffect, useRef, useState } from 'react'
import { IoVolumeMuteSharp, IoVolumeLowSharp, IoVolumeMediumSharp, IoVolumeHighSharp } from 'react-icons/io5'

import usePlayer from '../../hooks/usePlayer'

import Slider from '../Slider'

const Volume = () => {
    const [volume, setVolume] = useState(0.5)
    const lastKnownVolume = useRef(0) // Keep track of last known > 0 value for mute/unmute function
    const player = usePlayer()
    const activeDevice = player.devices.active

    let Icon = IoVolumeMuteSharp
    switch (true) {
        case volume > 0 && volume <= 0.33:
            Icon = IoVolumeLowSharp
            break
        case volume > 0.33 && volume <= 0.66:
            Icon = IoVolumeMediumSharp
            break
        case volume > 0.66:
            Icon = IoVolumeHighSharp
            break
    }

    const handleIconClick = () => {
        if (volume === 0) setVolume(lastKnownVolume.current), player.setVolume(lastKnownVolume.current)
        else setVolume(0), player.setVolume(0)
    }

    const handleChange = (v: number) => {
        if (v > 0) lastKnownVolume.current = v
        setVolume(v)
    }

    useEffect(() => {
        if (activeDevice.volume_percent) {
            if (activeDevice.volume_percent > 0) lastKnownVolume.current = activeDevice.volume_percent / 100
            setVolume(activeDevice.volume_percent / 100)
        }
    }, [activeDevice.volume_percent])

    return (
        <div className="flex w-full max-w-[140px] items-center gap-x-2">
            <Icon
                onClick={handleIconClick}
                size={20}
                className="shrink-0 cursor-pointer"
            />
            <Slider
                defaultValue={0.5}
                value={volume}
                onChange={(v) => handleChange(v)}
                onCommit={(v) => player.setVolume(v)}
                disabled={activeDevice.id === null}
                className="w-full"
            />
        </div>
    )
}

export default Volume
