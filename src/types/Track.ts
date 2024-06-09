import { ArtistSimplified } from './Artist'
import { ExternalUrls } from './Misc'

export interface TrackSimplified {
    artists: ArtistSimplified[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    preview_url: string
    track_number: number
    type: string
    uri: string
}
