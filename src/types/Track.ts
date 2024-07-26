import { SimplifiedAlbum } from './Album'
import { SimplifiedArtist } from './Artist'
import { ExternalIds, ExternalUrls } from './Misc'
import { PublicUserSimplified } from './User'

export interface Track {
    album: SimplifiedAlbum
    artists: SimplifiedArtist[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    is_playable: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

export interface SimplifiedTrack {
    artists: SimplifiedArtist[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    is_playable: boolean
    name: string
    preview_url: string
    track_number: number
    type: string
    uri: string
}

export interface SavedTrack {
    added_at: string
    track: Track
}

export interface PlaylistTrack {
    added_at: string
    added_by: PublicUserSimplified
    is_local: boolean
    track: Track
}

export interface NormalisedTrack {
    added_at?: string
    added_by?: PublicUserSimplified
    album?: SimplifiedAlbum
    artists: SimplifiedArtist[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids?: ExternalIds
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    is_playable: boolean
    name: string
    popularity?: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}
