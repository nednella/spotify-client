import { create } from 'zustand'

import spotifySDK from '../spotifySDK/spotifySDK'

import getDevices from '../api/player/getDevices'
import setDevice from '../api/player/setDevice'
import play from '../api/player/play'
import pause from '../api/player/pause'
import next from '../api/player/next'
import previous from '../api/player/previous'
import repeat from '../api/player/repeat'
import shuffle from '../api/player/shuffle'
import _volume from '../api/player/volume'
import seek from '../api/player/seek'
import getQeueue from '../api/player/getQueue'

import { Device, defaultDevice } from '../types/Device'
import { defaultPlaybackState } from '../types/Defaults'
import { Track } from '../types/Track'

interface PlayerStore {
    devices: {
        active: Device
        list: Device[]
    }
    deviceId: string
    playerState: Spotify.PlaybackState
    queue: {
        current: Track | null
        list: Track[] | []
    }
    SDK: Spotify.Player | null
    getDevices: () => void
    getQueue: () => void
    initialisePlayer: (token: string) => void
    isThisDeviceActive: () => boolean
    next: () => void
    pause: () => void
    play: () => void
    playContext: (contextUri: string, offset?: number) => void
    previous: () => void
    seek: (position: number) => void
    setActiveDevice: (deviceId: string | null) => void
    setDeviceId: (id: string) => void
    setSDK: (SDK: Spotify.Player) => void
    setVolume: (volume: number) => void
    syncSDKPlayerState: (state: Spotify.PlaybackState) => void
    toggleRepeat: () => void
    toggleShuffle: () => void
    updatePlayerPos: (pos: number) => void
}

const usePlayer = create<PlayerStore>()((set, get) => ({
    devices: {
        active: defaultDevice,
        list: [],
    },
    deviceId: '',
    playerState: defaultPlaybackState,
    queue: {
        current: null,
        list: [],
    },
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
    getQueue: async () => {
        set(() => ({ queue: { current: null, list: [] } }))
        const queue = await getQeueue()
        if (queue.currently_playing) set((state) => ({ queue: { ...state.queue, current: queue.currently_playing } }))
        set((state) => ({ queue: { ...state.queue, list: queue.queue } }))
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
    next: async () => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            SDK.nextTrack()
        } else {
            await next(get().devices.active.id)
        }
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
    previous: async () => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            SDK.previousTrack()
        } else {
            await previous(get().devices.active.id)
        }
    },
    setActiveDevice: async (deviceId) => {
        if (!deviceId) return
        set(() => ({ playerState: defaultPlaybackState }))
        await setDevice(deviceId)
        const devices = await getDevices()
        const activeDevice = devices.find((device: Device) => device.id === deviceId)
        set((state) => ({ devices: { ...state.devices, active: activeDevice } }))
        set((state) => ({ devices: { ...state.devices, list: devices } }))
    },
    seek: async (position: number) => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            await SDK.seek(position)
        } else {
            await seek(get().devices.active.id, position)
        }
    },
    setDeviceId: (id: string) => set(() => ({ deviceId: id })),
    setSDK: (SDKobj: Spotify.Player) => set(() => ({ SDK: SDKobj })),
    setVolume: async (volume: number) => {
        const SDK = get().SDK
        if (SDK && get().isThisDeviceActive()) {
            SDK.setVolume(volume)
        } else {
            await _volume(get().devices.active.id, volume * 100)
        }
    },
    syncSDKPlayerState: (state: Spotify.PlaybackState) => set(() => ({ playerState: state })),
    toggleRepeat: async () => {
        const repeatState = get().playerState?.repeat_mode
        if (repeatState === 0) await repeat(get().devices.active.id, 'context')
        else if (repeatState === 1) await repeat(get().devices.active.id, 'track')
        else await repeat(get().devices.active.id, 'off')
    },
    toggleShuffle: async () => {
        const shuffleState = get().playerState?.shuffle
        if (shuffleState === false) await shuffle(get().devices.active.id, true)
        else await shuffle(get().devices.active.id, false)
    },
    updatePlayerPos: (pos) => set((state) => ({ playerState: { ...state.playerState, position: pos } })),
}))

export default usePlayer

// Defined actions to allow usage outside of functional components where React hooks cannot be used
export const getAvailableDevices = () => usePlayer.getState().getDevices()
export const setDeviceId = (id: string) => usePlayer.setState({ deviceId: id })
export const syncSDKPlayerState = (state: Spotify.PlaybackState) => usePlayer.setState({ playerState: state })
export const syncSDKTrackQueue = () => usePlayer.getState().getQueue()
