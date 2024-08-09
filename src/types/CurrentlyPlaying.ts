import { Device, defaultDevice } from './Device'
import { Track } from './Track'

export interface CurrentlyPlaying {
    context: {
        href: string
        type: 'album' | 'artist' | 'playlist' | 'show'
        uri: string
    } | null
    currently_playing_type: 'ad' | 'episode' | 'track' | 'unknown'
    device: Device
    is_playing: boolean
    item: Track | null
    progress_ms: number
    repeat_state: 'context' | 'off' | 'track'
    shuffle_state: boolean
    timestamp: number
}

export const defaultCurrentlyPlaying: CurrentlyPlaying = {
    context: {
        href: '',
        type: 'album',
        uri: '',
    },
    currently_playing_type: 'track',
    device: defaultDevice,
    is_playing: false,
    item: null,
    progress_ms: 0,
    repeat_state: 'off',
    shuffle_state: false,
    timestamp: 0,
}
