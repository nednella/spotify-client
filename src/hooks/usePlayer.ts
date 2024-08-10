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
    SDK: Spotify.Player | null
    initialisePlayer: (token: string) => void
    setDeviceId: (id: string) => void
    setSDK: (SDK: Spotify.Player) => void
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
    SDK: null,
    initialisePlayer: async (token: string) => {
        if (!get().SDK) {
            get().setSDK(spotifySDK(token))
            get().SDK?.connect()
        }
    },
    setDeviceId: (id: string) => set(() => ({ deviceId: id })),
    setSDK: (SDKobj: Spotify.Player) => set(() => ({ SDK: SDKobj })),
    syncSDKPlayerState: (state: Spotify.PlaybackState) => set(() => ({ playerState: state })),
}))

export default usePlayer

// Defined actions to allow usage outside of functional components where React hooks cannot be used
export const setDeviceId = (id: string) => usePlayer.setState({ deviceId: id })
export const syncSDKPlayerState = (state: Spotify.PlaybackState) => usePlayer.setState({ playerState: state })
