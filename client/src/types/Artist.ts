import { ExternalUrls, Followers } from './Misc'
import { Image } from './Image'

export interface Artist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
}

export interface SimplifiedArtist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}
