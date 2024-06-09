import { ArtistSimplified } from './Artist'
import { Copyrights, ExternalIds, ExternalUrls } from './Misc'
import { Image } from './Image'
import { Paging } from './Paging'
import { TrackSimplified } from './Track'

export interface Album {
    album_type: string
    artists: ArtistSimplified[]
    available_markets: string[]
    copyrights: Copyrights
    external_ids: ExternalIds
    external_urls: ExternalUrls
    genres: string[]
    href: string
    id: string
    images: Image[]
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    tracks: Paging<TrackSimplified>
    type: string
    uri: string
}
