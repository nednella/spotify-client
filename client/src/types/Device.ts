export type DeviceType =
    | 'audio_dongle'
    | 'automobile'
    | 'avr'
    | 'cast_audio'
    | 'cast_video'
    | 'computer'
    | 'game_console'
    | 'smartphone'
    | 'speaker'
    | 'stb'
    | 'tablet'
    | 'tv'

export interface Device {
    id: string | null
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: DeviceType
    volume_percent: number | null
}

export const defaultDevice: Device = {
    id: null,
    is_active: false,
    is_private_session: false,
    is_restricted: false,
    name: '',
    type: 'computer',
    volume_percent: null,
}
