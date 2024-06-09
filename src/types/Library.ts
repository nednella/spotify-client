import { Album } from './Album'
import { Artist } from './Artist'
import { PlaylistSimplified } from './Playlist'

export interface Library {
    playlists: PlaylistSimplified[]
    albums: Album[]
    artists: Artist[]
}
