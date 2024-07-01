import { ExternalUrls, Followers } from './Misc'
import { Image } from './Image'
import { PublicUserSimplified } from './User'
import { Paging } from './Paging'
import { SimplifiedTrack } from './Track'

export interface SimplifiedPlaylist {
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
    tracks: Paging<SimplifiedTrack>
    type: string
    uri: string
}
