import { SimplifiedArtist } from './Artist'
import { Copyrights, ExternalIds, ExternalUrls } from './Misc'
import { Image } from './Image'
import { Paging } from './Paging'
import { SimplifiedTrack } from './Track'

export interface Album {
    album_type: string
    artists: SimplifiedArtist[]
    copyrights: Copyrights
    external_ids: ExternalIds
    external_urls: ExternalUrls
    genres: string[]
    href: string
    id: string
    images: Image[]
    is_playable: boolean
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    tracks: Paging<SimplifiedTrack>
    type: string
    uri: string
}

export interface SimplifiedAlbum {
    album_group: string
    album_type: string
    artists: SimplifiedArtist[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}
