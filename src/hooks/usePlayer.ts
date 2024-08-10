import { create } from 'zustand'

import spotifySDK from '../spotifySDK/spotifySDK'

import getDevices from '../api/player/getDevices'
import setDevice from '../api/player/setDevice'

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
    isActiveDeviceExternal: () => boolean
    setActiveDevice: (deviceId: string) => void
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
        set((state) => ({ devices: { ...state.devices, list: devices } }))

        const activeDevice = devices.find((device: Device) => device.is_active)
        if (activeDevice) set((state) => ({ devices: { ...state.devices, active: activeDevice } }))
        else {
            // Transfer playback to this device.
            await setDevice(get().deviceId)

            const thisDevice = devices.find((device: Device) => device.id === get().deviceId)
            set((state) => ({ devices: { ...state.devices, active: thisDevice } }))
        }
    },
    isActiveDeviceExternal: () => {
        return get().devices.active.id !== get().deviceId
    },
    initialisePlayer: (token: string) => {
        if (!get().SDK) {
            get().setSDK(spotifySDK(token))
            get().SDK?.connect()
        }
    },
    setActiveDevice: async (deviceId) => await setDevice(deviceId),
    setDeviceId: (id: string) => set(() => ({ deviceId: id })),
    setSDK: (SDKobj: Spotify.Player) => set(() => ({ SDK: SDKobj })),
    syncSDKPlayerState: (state: Spotify.PlaybackState) => set(() => ({ playerState: state })),
}))

export default usePlayer

// Defined actions to allow usage outside of functional components where React hooks cannot be used
export const getAvailableDevices = () => usePlayer.getState().getDevices()
export const setDeviceId = (id: string) => usePlayer.setState({ deviceId: id })
export const syncSDKPlayerState = (state: Spotify.PlaybackState) => usePlayer.setState({ playerState: state })
