import { ExternalUrls, Followers } from './Misc'
import { Image } from './Image'
import { PublicUserSimplified } from './User'

export interface PlaylistSimplified {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: PublicUserSimplified
    public: boolean
    snapshot_id: string
    tracks: PlaylistTracksRef
    type: string
    uri: string
}

export interface PlaylistTracksRef {
    href: string
    total: number
}
