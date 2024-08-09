import { create } from 'zustand'

import { CurrentlyPlaying, defaultCurrentlyPlaying } from '../types/CurrentlyPlaying'
import { Device, defaultDevice } from '../types/Device'
import { defaultPlaybackState } from '../types/Defaults'

interface PlayerStore {
    currentTrack: CurrentlyPlaying
    devices: {
        active: Device
        list: Device[]
    }
    deviceId: string
    playerState: Spotify.PlaybackState
    queue: Spotify.Track[]
}

const usePlayer = create<PlayerStore>()((set, get) => ({
    currentTrack: defaultCurrentlyPlaying,
    devices: {
        active: defaultDevice,
        list: [],
    },
    deviceId: '',
    playerState: defaultPlaybackState,
    queue: [],
}))

export default usePlayer
