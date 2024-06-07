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
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: null
    total: number
}

export type Product = 'free' | 'open' | 'premium'
