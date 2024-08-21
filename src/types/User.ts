import { ExternalUrls, Followers } from './Misc'
import { Image } from './Image'

export interface User {
    country: string
    display_name: string
    email: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    product: Product
    token: string
    type: string
    uri: string
}

export interface PublicUserSimplified {
    display_name: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    type: string
    uri: string
}

export interface PublicUser {}

export type Product = 'free' | 'open' | 'premium'
