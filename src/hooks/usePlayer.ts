import { create } from 'zustand'

import spotifySDK from '../spotifySDK/spotifySDK'

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
    initialisePlayer: (token: string) => void
    setDeviceId: (id: string) => void
    syncSDKPlayerState: (state: Spotify.PlaybackState) => void
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
    initialisePlayer: async (token: string) => {
        if (!get().deviceId) spotifySDK(token).connect()
    },
    setDeviceId: (id: string) => set(() => ({ deviceId: id })),
    syncSDKPlayerState: (state: Spotify.PlaybackState) => set(() => ({ playerState: state })),
}))

export default usePlayer

// Defined actions to allow usage outside of functional components where React hooks cannot be used
export const setDeviceId = (id: string) => usePlayer.setState({ deviceId: id })
export const syncSDKPlayerState = (state: Spotify.PlaybackState) => usePlayer.setState({ playerState: state })
