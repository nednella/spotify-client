import { create } from 'zustand'

import spotifySDK from '../spotifySDK/spotifySDK'

import getDevices from '../api/player/getDevices'
import setDevice from '../api/player/setDevice'
import play from '../api/player/play'
import pause from '../api/player/pause'

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
    getDevices: () => void
    initialisePlayer: (token: string) => void
    isThisDeviceActive: () => boolean
    pause: () => void
    play: () => void
    playContext: (contextUri: string, offset?: number) => void
    setActiveDevice: (deviceId: string | null) => void
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
    getDevices: async () => {
        const devices = await getDevices()
        const activeDevice = devices.find((device: Device) => device.is_active)
        set((state) => ({ devices: { ...state.devices, list: devices } }))
        if (activeDevice) set((state) => ({ devices: { ...state.devices, active: activeDevice } }))
        else {
            await setDevice(get().deviceId) // Transfer playback to this device.
            const thisDevice = devices.find((device: Device) => device.id === get().deviceId)
            set((state) => ({ devices: { ...state.devices, active: thisDevice } }))
        }
    },
    initialisePlayer: (token: string) => {
        if (!get().SDK) {
            get().setSDK(spotifySDK(token))
            get().SDK?.connect()
        }
    },
    isThisDeviceActive: () => {
        return get().devices.active.id === get().deviceId
    },
    pause: async () => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            SDK.pause()
        } else {
            await pause(get().devices.active.id)
        }
    },
    play: async () => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            SDK.togglePlay()
        } else {
            await play(get().devices.active.id)
        }
    },
    playContext: async (contextUri: string, offset?: number) => await play(get().devices.active.id, contextUri, offset),
    setActiveDevice: async (deviceId) => {
        if (!deviceId) return
        set(() => ({ playerState: defaultPlaybackState }))
        await setDevice(deviceId)
        const devices = await getDevices()
        const activeDevice = devices.find((device: Device) => device.id === deviceId)
        set((state) => ({ devices: { ...state.devices, active: activeDevice } }))
        set((state) => ({ devices: { ...state.devices, list: devices } }))
    },
    setDeviceId: (id: string) => set(() => ({ deviceId: id })),
    setSDK: (SDKobj: Spotify.Player) => set(() => ({ SDK: SDKobj })),
    syncSDKPlayerState: (state: Spotify.PlaybackState) => set(() => ({ playerState: state })),
}))

export default usePlayer

// Defined actions to allow usage outside of functional components where React hooks cannot be used
export const getAvailableDevices = () => usePlayer.getState().getDevices()
export const setDeviceId = (id: string) => usePlayer.setState({ deviceId: id })
export const syncSDKPlayerState = (state: Spotify.PlaybackState) => usePlayer.setState({ playerState: state })
