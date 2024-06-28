import { Album } from './Album'
import { Artist } from './Artist'
import { PlaylistSimplified } from './Playlist'
import { Track } from './Track'

export interface Library {
    tracks: Track[]
    playlists: PlaylistSimplified[]
    albums: Album[]
    artists: Artist[]
}
