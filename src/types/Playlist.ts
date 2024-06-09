import { ExternalUrls } from './Misc'
import { Image } from './Image'
import { Followers } from './User'
import { PublicUser } from './PublicUser'
import { PlaylistTrack } from './PlaylistTrack'

export interface Playlist {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: PublicUser
    public: boolean
    snapshot_id: string
    tracks: PlaylistTrack
    type: string
    uri: string
}
