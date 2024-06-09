import { ExternalUrls } from './Misc'
import { Followers } from './User'

export interface PublicUser {
    display_name: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    type: string
    uri: string
}
