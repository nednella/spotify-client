import { Album } from './Album'
import { Artist } from './Artist'
import { SimplifiedPlaylist } from './Playlist'
import { SavedTrack } from './Track'

export interface Library {
    tracks: SavedTrack[]
    playlists: SimplifiedPlaylist[]
    albums: Album[]
    artists: Artist[]
}
